import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateString = searchParams.get("date") as string;
  const date = new Date(dateString);
  if (!date) {
    return NextResponse.json("Invalid Date", { status: 500 });
  }
  const response = await prisma.reservations.findMany({
    where: {
      date: date,
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
  return NextResponse.json(response);
}
