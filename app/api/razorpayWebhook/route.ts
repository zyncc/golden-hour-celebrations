import NikeReceiptEmail from "@/emails/receipt";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const rzp_response = await req.json();
    const paymentID = rzp_response.payload.payment.entity.id;
    const orderID = rzp_response.payload.payment.entity.order_id;
    const razorpaySignature = req.headers.get("x-razorpay-signature");

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(JSON.stringify(rzp_response))
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      console.log("Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 200 });
    }

    const updatedReservation = await prisma.reservations.update({
      where: {
        orderID,
      },
      data: {
        paymentStatus: true,
        paymentID,
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (updatedReservation) {
      const emailSent = await resend.emails.send({
        from: "Golden Hour Celebrations <info@goldenhourcelebrations.in>",
        to: [
          updatedReservation.email.toLowerCase(),
          "goldenhourcelebrationsblr@gmail.com",
          "chandankrishna288@gmail.com",
        ],
        subject: "Receipt for your Reservation",
        react: NikeReceiptEmail({
          getReservationDetails: updatedReservation,
        }),
      });
      console.log(emailSent);
    }
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/dashboard");
    revalidatePath("/account");
  }
  return NextResponse.json({ status: "ok" }, { status: 203 });
}
