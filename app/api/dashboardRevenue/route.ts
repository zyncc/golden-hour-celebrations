import { NextRequest, NextResponse } from "next/server";
import { startOfYear, endOfYear } from "date-fns";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const year = searchParams.get("year");

  if (!year) {
    return NextResponse.json("Invalid year", { status: 400 });
  }

  const now = new Date(`${year}-01-01T00:00:00.000Z`);
  const startOfThisYear = startOfYear(now);
  const endOfThisYear = endOfYear(now);

  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
      createdAt: {
        gte: startOfThisYear,
        lt: endOfThisYear,
      },
    },
    select: {
      balanceAmount: true,
      room: true,
      advanceAmount: true,
      discount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(reservations);
}
