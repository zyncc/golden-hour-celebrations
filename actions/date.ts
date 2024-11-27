"use server";

import prisma from "@/lib/prisma";

export async function getReservations(
  date: Date | undefined,
  branch: string,
  theatre: string
) {
  const reservations = await prisma.reservations.findMany({
    where: {
      date: {
        equals: date,
      },
      branch,
      theatre,
      paymentStatus: true,
    },
    select: {
      timeSlot: true,
      branch: true,
      date: true,
      theatre: true,
    },
  });
  return reservations;
}
