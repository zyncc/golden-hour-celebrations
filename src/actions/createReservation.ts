"use server";

import { auth } from "@/auth";
import { Reservation } from "@/context/ReservationStore";
import ReservationConfirmationEmail from "@/emails/receipt";
import {
  ADDITIONAL_PERSON_PRICE,
  ADVANCE_AMOUNT,
  BLUEBERRY_CHEESE_CAKE_PRICE,
  CAKE_PRICE,
  CANDLE_LIGHT_ROSE_PATH,
  DREAMSCAPE_THEATRE_PRICE,
  ELITE_THEATRE_PRICE,
  FOG_EFFECT_PRICE,
  LED_LETTER_LIGHT_AGE,
  LED_LETTER_LIGHT_NAME,
  MIDNIGHT_CHARGE,
  PHOTOGRAPHY_AND_VIDEO_PRICE,
  PHOTOGRAPHY_PRICE,
  RASMALAI_CAKE_PRICE,
  THE_ROYAL_THEATRE_ADVANCE_AMOUNT,
  THE_ROYAL_THEATRE_PRICE,
  TIME_ZONE,
} from "@/lib/constants";
import prisma from "@/lib/prisma";
import { parseSlotStart } from "@/lib/utils";
import { ManualBookingSchema, payReservationSchema } from "@/lib/zodSchemas";
import { Temporal } from "@js-temporal/polyfill";
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

  let advanceAmountPrice =
    reservation?.room == "The Royal" ? THE_ROYAL_THEATRE_ADVANCE_AMOUNT : ADVANCE_AMOUNT;

  const plainDate = Temporal.PlainDate.from(reservation.date!);
  const plainTime = parseSlotStart(reservation.timeSlot!);

  const zonedDateTime = plainDate.toZonedDateTime({
    plainTime,
    timeZone: TIME_ZONE,
  });

  // Selected booking instant (absolute UTC)
  const selectedInstant = zonedDateTime.toInstant();

  // Current instant (absolute UTC, server trusted)
  const nowInstant = Temporal.Now.instant();

  // Check if selected date time is greater than current time
  if (Temporal.Instant.compare(selectedInstant, nowInstant) <= 0) {
    throw new Error("Cannot book a past date or time slot");
  }

  if (reservation.room === "Elite Theatre") {
    total += ELITE_THEATRE_PRICE;
  } else if (reservation.room === "Dreamscape Theatre") {
    total += DREAMSCAPE_THEATRE_PRICE;
  } else if (reservation.room === "The Royal") {
    total += THE_ROYAL_THEATRE_PRICE;
  }

  if (reservation?.cake) {
    if (reservation.cake == "Rasmalai Cake") {
      total += RASMALAI_CAKE_PRICE;
      advanceAmountPrice += 800;
    } else if (reservation.cake == "Blueberry Cheese Cake") {
      total += BLUEBERRY_CHEESE_CAKE_PRICE;
      advanceAmountPrice += 900;
    } else {
      total += CAKE_PRICE;
      advanceAmountPrice += CAKE_PRICE;
    }
  }

  if (reservation.fogEntry) {
    total += 400;
    advanceAmountPrice += 400;
  }

  if (reservation.rosePath) {
    total += CANDLE_LIGHT_ROSE_PATH;
  }

  if (
    reservation?.timeSlot === "10PM - 12AM" ||
    reservation?.timeSlot === "10:30PM - 12:30AM"
  ) {
    total += MIDNIGHT_CHARGE;
  }

  if (reservation.photography === "photoshoot") {
    total += PHOTOGRAPHY_PRICE;
  } else if (reservation.photography === "video") {
    total += PHOTOGRAPHY_AND_VIDEO_PRICE;
  }

  if (reservation.ledLetterName) {
    total += LED_LETTER_LIGHT_NAME;
  }
  if (reservation.ledLetterAge) {
    total += LED_LETTER_LIGHT_AGE;
  }

  if (
    reservation.room === "Dreamscape Theatre" &&
    reservation.noOfPeople &&
    reservation.noOfPeople > 2
  ) {
    total += (reservation.noOfPeople - 2) * ADDITIONAL_PERSON_PRICE;
  } else if (
    reservation.room === "Elite Theatre" &&
    reservation.noOfPeople &&
    reservation.noOfPeople > 4
  ) {
    total += (reservation.noOfPeople - 4) * ADDITIONAL_PERSON_PRICE;
  } else if (
    reservation.room === "The Royal" &&
    reservation.noOfPeople &&
    reservation.noOfPeople > 15
  ) {
    total += (reservation.noOfPeople - 15) * ADDITIONAL_PERSON_PRICE;
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
      date: new Date(data.date),
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
        date: new Date(zonedDateTime.epochMilliseconds),
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

  const plainDate = Temporal.PlainDate.from(data.date);
  const plainTime = parseSlotStart(data.timeSlot);

  const zonedDateTime = plainDate.toZonedDateTime({
    plainTime,
    timeZone: TIME_ZONE,
  });

  // Selected booking instant (absolute UTC)
  const selectedInstant = zonedDateTime.toInstant();

  // Current instant (absolute UTC, server trusted)
  const nowInstant = Temporal.Now.instant();

  // Check if selected date time is greater than current time
  if (Temporal.Instant.compare(selectedInstant, nowInstant) <= 0) {
    throw new Error("Cannot book a past date or time slot");
  }

  const { advanceAmount, discount = 0, ...rest } = data;
  const checkExistingBookings = await prisma.reservations.findFirst({
    where: {
      date: new Date(zonedDateTime.epochMilliseconds),
      room: data.room,
      paymentStatus: true,
    },
  });

  console.log("Existing Booking", checkExistingBookings);

  if (checkExistingBookings) {
    throw new Error("Someone has booked another reservation at the same Time Slot!");
  }

  let total = 0;

  if (data.room === "Dreamscape Theatre") {
    total += DREAMSCAPE_THEATRE_PRICE;
  } else if (data.room === "Elite Theatre") {
    total += ELITE_THEATRE_PRICE;
  } else if (data.room === "The Royal") {
    total += THE_ROYAL_THEATRE_PRICE;
  }

  if (data.cake) {
    if (data.cake == "Rasmalai Cake") {
      total += RASMALAI_CAKE_PRICE;
    } else if (data.cake == "Blueberry Cheese Cake") {
      total += BLUEBERRY_CHEESE_CAKE_PRICE;
    } else {
      total += CAKE_PRICE;
    }
  }
  if (data.fogEntry) total += FOG_EFFECT_PRICE;
  if (data.rosePath) total += CANDLE_LIGHT_ROSE_PATH;

  if (data.photography === "photoshoot") total += PHOTOGRAPHY_PRICE;
  else if (data.photography === "video") total += PHOTOGRAPHY_AND_VIDEO_PRICE;

  if (data.timeSlot === "10PM - 12AM" || data.timeSlot === "10:30PM - 12:30AM") {
    total += MIDNIGHT_CHARGE;
  }

  if (data.ledLetterName) {
    total += LED_LETTER_LIGHT_NAME;
  }

  if (data.ledLetterAge) {
    total += LED_LETTER_LIGHT_AGE;
  }

  if (data.room === "Dreamscape Theatre" && data.noOfPeople && data.noOfPeople > 2) {
    total += (data.noOfPeople - 2) * ADDITIONAL_PERSON_PRICE;
  } else if (data.room === "Elite Theatre" && data.noOfPeople && data.noOfPeople > 4) {
    total += (data.noOfPeople - 4) * ADDITIONAL_PERSON_PRICE;
  } else if (data.room === "The Royal" && data.noOfPeople && data.noOfPeople > 15) {
    total += (data.noOfPeople - 15) * ADDITIONAL_PERSON_PRICE;
  }

  const balanceAmount = total - discount - advanceAmount;

  const booking = await prisma.reservations.create({
    data: {
      ...rest,
      date: new Date(zonedDateTime.epochMilliseconds),
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
