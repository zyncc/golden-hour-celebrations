"use server";

import { Reservation } from "@/app/context/ReservationStore";
import prisma from "@/lib/prisma";
import { payReservationSchema } from "@/lib/zodSchemas";
import axios from "axios";
import { SHA256 } from "crypto-js";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function Payy(reservation: Reservation, balanceAmount: number) {
  const { success, data, error } = payReservationSchema.safeParse({
    ...reservation,
    balanceAmount,
  });
  if (!success) {
    console.log(error.issues);
    throw new Error("Invalid DATA");
  }
  const mtrID = uuidv4().split("-")[0];
  const payload = {
    merchantId: process.env.MERCHANT_ID,
    merchantTransactionId: mtrID,
    merchantUserId: "MUID123",
    amount: 100,
    redirectUrl:
      process.env.NODE_ENV == "development"
        ? `http://localhost:3000/payment/${mtrID}`
        : `https://goldenhourcelebrations.in/payment/${mtrID}`,
    redirectMode: "REDIRECT",
    callbackUrl:
      process.env.NODE_ENV == "development"
        ? "https://e2f8-106-51-216-201.ngrok-free.app/api/validatePayment"
        : "https://goldenhourcelebrations.in/api/validatePayment",
    mobileNumber: data.phone,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const checksum =
    SHA256(base64Payload + "/pg/v1/pay" + process.env.SALT_KEY) +
    "###" +
    process.env.SALT_INDEX;

  const options = {
    method: "POST",
    url:
      process.env.NODE_ENV == "development"
        ? "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        : "https://api.phonepe.com/apis/hermes/pg/v1/pay",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: base64Payload,
    },
  };
  const checkExistingBookings = await prisma.reservations.findFirst({
    where: {
      date: data.date,
      room: data.room,
      timeSlot: data.timeSlot,
      paymentStatus: true,
    },
  });
  if (checkExistingBookings) {
    return {
      title: "Error creating Reservation",
      description:
        "Someone has booked another reservation at the same Time Slot!",
    };
  }
  try {
    await prisma.reservations.create({
      data: {
        merchantTransactionID: mtrID,
        balanceAmount,
        date: data.date as Date,
        email: data.email as string,
        findUs: data.findus as string,
        name: data.name as string,
        occasion: data.occasion as string,
        phone: data.phone as string,
        room: data.room as string,
        timeSlot: data.timeSlot as string,
      },
    });
  } catch (e) {
    console.log(e);
  }
  const response = await axios.request(options);
  redirect(response.data.data.instrumentResponse.redirectInfo.url);
}
