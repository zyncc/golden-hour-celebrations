"use server";

import NikeReceiptEmail from "@/emails/receipt";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

export async function SendReceipt(orderID: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const getReservationDetails = await prisma.reservations.findUnique({
    where: { orderID },
  });
  try {
    if (getReservationDetails) {
      const emailSent = await resend.emails.send({
        from: "Golden Hour Celebrations <info@goldenhourcelebrations.in>",
        to: [
          getReservationDetails.email,
          "goldenhourcelebrationsblr@gmail.com",
          "chandankrishna288@gmail.com",
        ],
        subject: "Receipt for your Reservation",
        react: NikeReceiptEmail({ getReservationDetails }),
      });
      console.log(emailSent);
    }
  } catch (error) {
    console.log(error);
  }
}
