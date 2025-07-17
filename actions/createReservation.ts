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

  let advanceAmountPrice = advanceAmount;

  if (reservation.room === "Majestic Theatre") {
    total += 1899;
  } else if (reservation.room === "Dreamscape Theatre") {
    total += 1499;
  }

  if (reservation?.cake) {
    if (reservation.cake == "Red velvet" || reservation.cake == "Rasmalai") {
      total += 620;
      advanceAmountPrice += 620;
    } else {
      total += cakePrice;
      advanceAmountPrice += cakePrice;
    }
  }

  if (reservation.fogEntry) {
    total += 400;
    advanceAmountPrice += 400;
  }

  if (reservation.rosePath) {
    total += 400;
  }

  if (
    reservation?.timeSlot === "10PM - 12AM" ||
    reservation?.timeSlot === "10:30PM - 12:30AM"
  ) {
    total += 500;
  }

  if (reservation.photography === "photoshoot") {
    total += 700;
  } else if (reservation.photography === "video") {
    total += 1500;
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

  let AdvanceAmount = payFull ? total : advanceAmountPrice;
  let BalanceAmount = payFull ? 0 : total - advanceAmountPrice;

  const { success, error, data } = payReservationSchema.safeParse({
    ...reservation,
    balanceAmount: BalanceAmount,
  });
  if (!success) {
    console.log(error.issues);
    throw new Error("Invalid DATA");
  }

  const date = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`;

  const checkExistingBookings = await prisma.reservations.findFirst({
    where: {
      date,
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
        writingOnCake: data.writingOnCake,
        specialRequests: data.specialRequests,
        date: date,
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
const date = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`;
console.log(date)
  const checkExistingBookings = await prisma.reservations.findFirst({
    where: {
      date,
      room: data.room,
      timeSlot: data.timeSlot,
      paymentStatus: true,
    },
  });

  console.log(checkExistingBookings); 

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

  if (data.cake) {
    if (data.cake == "Red velvet" || data.cake == "Rasmalai") {
      total += 620;
    } else {
      total += cakePrice;
    }
  }
  if (data.fogEntry) total += 400;
  if (data.rosePath) total += 400;

  if (data.photography === "photoshoot") total += 700;
  else if (data.photography === "video") total += 1500;

  if (
    data.timeSlot === "10PM - 12AM" ||
    data.timeSlot === "10:30PM - 12:30AM"
  ) {
    total += 500;
  }

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
      date,
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
