"use server";

import { auth } from "@/auth";
import { Reservation } from "@/context/ReservationStore";
import prisma from "@/lib/prisma";
import { ManualBookingSchema, payReservationSchema } from "@/lib/zodSchemas";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { SendReceipt } from "./emails";

export async function createReservation(
  payFull: boolean,
  reservation: Reservation,
  orderID: string
) {
  let balanceAmount = 0;
  if (reservation.room === "Basic Package") {
    balanceAmount = 1999 - 500;
  } else if (reservation.room === "Standard Package") {
    balanceAmount = 2999 - 500;
  } else if (reservation.room === "Premium Package") {
    balanceAmount = 3999 - 500;
  }
  if (payFull) balanceAmount = 0;
  const { success, data, error } = payReservationSchema.safeParse({
    ...reservation,
    balanceAmount,
  });
  if (!success) {
    console.log(error.issues);
    throw new Error("Invalid DATA");
  }
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
        orderID,
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
}

type Data = z.infer<typeof ManualBookingSchema>;

export async function CreateManualBooking(data: Data) {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  const { advanceAmount, packageType, ...rest } = data;
  const checkExistingBookings = await prisma.reservations.findFirst({
    where: {
      date: data.date,
      room: data.packageType,
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
  const res = await prisma.reservations.create({
    data: {
      ...rest,
      room: data.packageType,
      paymentStatus: true,
      orderID: randomUUID(),
    },
  });
  SendReceipt(res.orderID!);
}
