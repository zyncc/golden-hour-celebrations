import { TIME_ZONE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Temporal } from "@js-temporal/polyfill";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const DateString = searchParams.get("date") as string;
  if (!DateString) {
    return NextResponse.json("Invalid Date", { status: 500 });
  }

  const plainDate = Temporal.PlainDate.from(DateString);

  const startInstant = plainDate.toZonedDateTime({ timeZone: TIME_ZONE }).toInstant();

  // Start of next day IST → UTC instant (exclusive end)
  const endInstant = plainDate
    .add({ days: 1 })
    .subtract({ seconds: 1 })
    .toZonedDateTime({ timeZone: TIME_ZONE })
    .toInstant();

  console.log(startInstant.toString(), endInstant.toString());

  const response = await prisma.reservations.findMany({
    where: {
      date: {
        gte: new Date(startInstant.epochMilliseconds),
        lt: new Date(endInstant.epochMilliseconds),
      },
      paymentStatus: true,
    },
    select: {
      paymentStatus: true,
      date: true,
      room: true,
      timeSlot: true,
      occasion: true,
    },
  });

  console.log(response);

  return NextResponse.json(response);
}
