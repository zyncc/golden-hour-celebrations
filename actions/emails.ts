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
        from: "onboarding@resend.dev",
        to: [getReservationDetails.email],
        subject: "Receipt for your Reservation",
        react: NikeReceiptEmail({ getReservationDetails }),
      });
      console.log(emailSent);
      if (!emailSent.error && orderID !== null) {
        const updateEmail = await prisma.reservations.update({
          where: {
            orderID: orderID,
          },
          data: {
            emailSent: true,
          },
        });
        if (updateEmail) console.log("Update Email Sent");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
