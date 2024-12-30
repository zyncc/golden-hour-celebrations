import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const rzp_response = await req.json();
  const paymentID = rzp_response.payload.payment.entity.id;
  const orderID = rzp_response.payload.payment.entity.order_id;
  await prisma.reservations.update({
    where: {
      orderID,
    },
    data: {
      paymentStatus: true,
      paymentID,
    },
  });
  revalidatePath("/admin");
  revalidatePath("/account");
  return NextResponse.json(rzp_response);
}
