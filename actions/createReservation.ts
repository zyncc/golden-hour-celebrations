"use server";

import { auth } from "@/auth";
import { Reservation } from "@/context/ReservationStore";
import NikeReceiptEmail from "@/emails/receipt";
import { advanceAmount, cakePrice } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { ManualBookingSchema, payReservationSchema } from "@/lib/zodSchemas";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

export async function createReservation(
  payFull: boolean,
  reservation: Reservation,
  orderID: string
) {
  let total = 0;

  if (reservation.room === "Majestic Theatre") {
    total += 1899;
  } else if (reservation.room === "Dreamscape Theatre") {
    total += 1499;
  }

  if (reservation.cake) {
    total += cakePrice;
  }

  if (reservation.fogEntry) {
    total += 400;
  }

  if (reservation.rosePath) {
    total += 400;
  }

  if (reservation.photography === "30") {
    total += 700;
  } else if (reservation.photography === "60") {
    total += 1000;
  }

  if (
    reservation.room === "Dreamscape Theatre" &&
    reservation.noOfPeople &&
    reservation.noOfPeople > 2
  ) {
    total += (reservation.noOfPeople - 2) * 200;
  } else if (
    reservation.room === "Majestic Theatre" &&
    reservation.noOfPeople &&
    reservation.noOfPeople > 4
  ) {
    total += (reservation.noOfPeople - 4) * 200;
  }

  let AdvanceAmount = payFull ? total : advanceAmount;
  let BalanceAmount = payFull ? 0 : total - advanceAmount;

  const { success, error, data } = payReservationSchema.safeParse({
    ...reservation,
    balanceAmount: BalanceAmount,
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
        balanceAmount: BalanceAmount,
        advanceAmount: AdvanceAmount,
        noOfPeople: data.noOfPeople,
        nameToDisplay: data.nameToDisplay,
        date: data.date as Date,
        email: data.email as string,
        findUs: data.findus as string,
        name: data.name as string,
        occasion: data.occasion as string,
        phone: data.phone as string,
        room: data.room as string,
        timeSlot: data.timeSlot as string,
        discount: 0,
        cake: data.cake,
        photography: data.photography,
        fogEntry: data.fogEntry,
        rosePath: data.rosePath,
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

  const { advanceAmount, discount = 0, ...rest } = data;

  const checkExistingBookings = await prisma.reservations.findFirst({
    where: {
      date: data.date,
      room: data.room,
      timeSlot: data.timeSlot,
      paymentStatus: true,
    },
  });

  if (checkExistingBookings) {
    throw new Error(
      "Someone has booked another reservation at the same Time Slot!"
    );
  }

  let total = 0;

  if (data.room === "Dreamscape Theatre") {
    total += 1499;
  } else if (data.room === "Majestic Theatre") {
    total += 1899;
  }

  if (data.cake) total += cakePrice;
  if (data.fogEntry) total += 400;
  if (data.rosePath) total += 400;

  if (data.photography === "30") total += 700;
  else if (data.photography === "60") total += 1000;

  if (
    data.room === "Dreamscape Theatre" &&
    data.noOfPeople &&
    data.noOfPeople > 2
  ) {
    total += (data.noOfPeople - 2) * 200;
  } else if (
    data.room === "Majestic Theatre" &&
    data.noOfPeople &&
    data.noOfPeople > 4
  ) {
    total += (data.noOfPeople - 4) * 200;
  }

  const balanceAmount = total - discount - advanceAmount;

  const booking = await prisma.reservations.create({
    data: {
      ...rest,
      discount,
      balanceAmount,
      advanceAmount,
      paymentStatus: true,
      orderID: randomUUID(),
      manualBooking: true,
    },
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const emailSent = await resend.emails.send({
    from: "Golden Hour Celebrations <info@goldenhourcelebrations.in>",
    to: [
      booking.email.toLowerCase(),
      "goldenhourcelebrationsblr@gmail.com",
      "chandankrishna288@gmail.com",
    ],
    subject: "Receipt for your Reservation",
    react: NikeReceiptEmail({ getReservationDetails: booking }),
  });

  console.log(emailSent);
}
