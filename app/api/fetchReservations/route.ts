import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isoDateString = searchParams.get("date") as string;
  if (!isoDateString) {
    return NextResponse.json("Invalid Date", { status: 500 });
  }
  const date = new Date(isoDateString);
  const response = await prisma.reservations.findMany({
    where: {
      date,
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
  console.log(response.length);
  return NextResponse.json(response);
}
