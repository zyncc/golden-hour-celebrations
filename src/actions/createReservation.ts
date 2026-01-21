"use server";

import { auth } from "@/auth";
import { Reservation } from "@/context/ReservationStore";
import ReservationConfirmationEmail from "@/emails/receipt";
import {
  advanceAmount,
  cakePrice,
  candleLightRosePath,
  ledLetterLightAge,
  ledLetterLightName,
} from "@/lib/constants";
import prisma from "@/lib/prisma";
import { ManualBookingSchema, payReservationSchema } from "@/lib/zodSchemas";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

export async function createReservation(
  payFull: boolean,
  reservation: Reservation,
  orderID: string,
) {
  let total = 0;

  let advanceAmountPrice = advanceAmount;

  if (reservation.room === "Elite Theatre") {
    total += 1899;
  } else if (reservation.room === "Dreamscape Theatre") {
    total += 1499;
  }

  if (reservation?.cake) {
    if (reservation.cake == "Rasmalai Cake") {
      total += 800;
      advanceAmountPrice += 800;
    } else if (reservation.cake == "Blueberry Cheese Cake") {
      total += 900;
      advanceAmountPrice += 900;
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
    total += candleLightRosePath;
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

  if (reservation.ledLetterName) {
    total += ledLetterLightName;
  }
  if (reservation.ledLetterAge) {
    total += ledLetterLightAge;
  }

  if (
    reservation.room === "Dreamscape Theatre" &&
    reservation.noOfPeople &&
    reservation.noOfPeople > 2
  ) {
    total += (reservation.noOfPeople - 2) * 200;
  } else if (
    reservation.room === "Elite Theatre" &&
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

  const checkExistingBookings = await prisma.reservations.findFirst({
    where: {
      date: data.date,
      room: data.room,
      timeSlot: data.timeSlot,
      paymentStatus: true,
    },
  });
  console.log("Existing Booking", checkExistingBookings);
  if (checkExistingBookings) {
    return {
      title: "Error creating Reservation",
      description: "Someone has booked another reservation at the same Time Slot!",
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
        date: data.date,
        email: data.email,
        findUs: data.findus,
        name: data.name,
        ledLetterName: data.ledLetterName,
        ledLetterAge: data.ledLetterAge,
        occasion: data.occasion,
        phone: data.phone,
        room: data.room,
        timeSlot: data.timeSlot,
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
    headers: await headers(),
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

  console.log("Existing Booking", checkExistingBookings);

  if (checkExistingBookings) {
    throw new Error("Someone has booked another reservation at the same Time Slot!");
  }

  let total = 0;

  if (data.room === "Dreamscape Theatre") {
    total += 1499;
  } else if (data.room === "Elite Theatre") {
    total += 1899;
  }

  if (data.cake) {
    if (data.cake == "Rasmalai Cake") {
      total += 800;
    } else if (data.cake == "Blueberry Cheese Cake") {
      total += 900;
    } else {
      total += cakePrice;
    }
  }
  if (data.fogEntry) total += 400;
  if (data.rosePath) total += candleLightRosePath;

  if (data.photography === "photoshoot") total += 700;
  else if (data.photography === "video") total += 1500;

  if (data.timeSlot === "10PM - 12AM" || data.timeSlot === "10:30PM - 12:30AM") {
    total += 500;
  }

  if (data.ledLetterName) {
    total += ledLetterLightName;
  }

  if (data.ledLetterAge) {
    total += ledLetterLightAge;
  }

  if (data.room === "Dreamscape Theatre" && data.noOfPeople && data.noOfPeople > 2) {
    total += (data.noOfPeople - 2) * 200;
  } else if (data.room === "Elite Theatre" && data.noOfPeople && data.noOfPeople > 4) {
    total += (data.noOfPeople - 4) * 200;
  }

  const balanceAmount = total - discount - advanceAmount;

  const booking = await prisma.reservations.create({
    data: {
      ...rest,
      date: data.date,
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
    to: [booking.email.toLowerCase(), "goldenhourcelebrationsblr@gmail.com"],
    subject: "Receipt for your Reservation",
    react: ReservationConfirmationEmail({ getReservationDetails: booking }),
  });

  console.log(emailSent);
}

export async function DeleteReservation(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role !== "admin") {
    return { success: false, data: "Unauthorized" };
  }

  const findReservation = await prisma.reservations.findUnique({
    where: {
      id,
    },
  });

  if (!findReservation) {
    return { success: false, data: "Reservation with that id does not exist" };
  }

  await prisma.reservations.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/recent-bookings");
  revalidatePath("/dashboard/all-bookings");

  return { success: true, data: "Reservation deleted" };
}
