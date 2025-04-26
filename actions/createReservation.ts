"use server";

import { auth } from "@/auth";
import { Reservation } from "@/context/ReservationStore";
import NikeReceiptEmail from "@/emails/receipt";
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
  let balanceAmount = 0;
  if (reservation.room === "Majestic Theatre") {
    balanceAmount = 1499 - 500;
  } else if (reservation.room === "Dreamscape Theatre") {
    balanceAmount = 1499 - 500;
  }
  if (reservation.cake) balanceAmount += 500;
  if (reservation.fogEntry) balanceAmount += 400;
  if (reservation.rosePath) balanceAmount += 400;
  if (reservation.photography === "30") balanceAmount += 700;
  if (reservation.photography === "60") balanceAmount += 1000;
  if (payFull) balanceAmount = 0;
  const { success, error, data } = payReservationSchema.safeParse({
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
  // const session = await auth.api.getSession({
  //   headers: headers(),
  // });
  // if (session?.user.role !== "admin") {
  //   throw new Error("Unauthorized");
  // }

  const { advanceAmount, ...rest } = data;

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
  let balanceAmount = -data.advanceAmount;
  if (data.room == "Dreamscape Theatre") {
    balanceAmount += 1499;
  } else if (data.room == "Majestic Theatre") {
    balanceAmount += 1899;
  }
  if (data.cake) {
    balanceAmount += 500;
  }
  if (data.fogEntry) {
    balanceAmount += 400;
  }
  if (data.rosePath) {
    balanceAmount += 400;
  }
  if (data.photography == "30") {
    balanceAmount += 700;
  } else if (data.photography == "60") {
    balanceAmount += 1000;
  }

  const booking = await prisma.reservations.create({
    data: {
      ...rest,
      balanceAmount,
      paymentStatus: true,
      orderID: randomUUID(),
      manualBooking: true,
    },
  });
  const resend = new Resend(process.env.RESEND_API_KEY);
  const emailSent = await resend.emails.send({
    from: "Golden Hour Celebrations <info@goldenhourcelebrations.in>",
    to: [
      booking.email,
      "goldenhourcelebrationsblr@gmail.com",
      "chandankrishna288@gmail.com",
    ],
    subject: "Receipt for your Reservation",
    react: NikeReceiptEmail({ getReservationDetails: booking }),
  });
  console.log(emailSent);
}
