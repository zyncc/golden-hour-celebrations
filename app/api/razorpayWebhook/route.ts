import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const rzp_response = await req.json();
  const paymentID = rzp_response.payload.payment.entity.id;
  const orderID = rzp_response.payload.payment.entity.order_id;
  const razorpaySignature = req.headers.get("x-razorpay-signature");

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(JSON.stringify(rzp_response))
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 200 });
  }

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
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
