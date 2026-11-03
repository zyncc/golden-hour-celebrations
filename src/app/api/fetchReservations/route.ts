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

  // End of day IST
  const endInstant = plainDate
    .add({ days: 1 })
    .toZonedDateTime({ timeZone: TIME_ZONE })
    .toInstant();

  // A wide window to catch bookings spanning midnight or overlapping adjacent days
  const windowStart = new Date(startInstant.epochMilliseconds - 12 * 60 * 60 * 1000);
  const windowEnd = new Date(endInstant.epochMilliseconds + 12 * 60 * 60 * 1000);

  const dayStartDate = new Date(startInstant.epochMilliseconds);
  const dayEndDate = new Date(endInstant.epochMilliseconds);

  const response = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
      OR: [
        {
          slotStartTime: { lt: dayEndDate },
          slotEndTime: { gt: dayStartDate },
        },
        {
          date: {
            gte: windowStart,
            lt: windowEnd,
          },
        },
      ],
    },
    select: {
      paymentStatus: true,
      date: true,
      room: true,
      timeSlot: true,
      slotStartTime: true,
      slotEndTime: true,
      duration: true,
      occasion: true,
    },
  });

  return NextResponse.json(response);
}
