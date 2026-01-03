import ReservationConfirmationEmail from "@/emails/receipt";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { google } from "googleapis";
import { getEventTimeRange } from "@/lib/utils";

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
        ],
        subject: "Receipt for your Reservation",
        react: ReservationConfirmationEmail({
          getReservationDetails: updatedReservation,
        }),
      });
      console.log(emailSent);
    }

    const { startDateTime, endDateTime } = getEventTimeRange(
      updatedReservation.date.toString(),
      updatedReservation.timeSlot
    );

    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/google/callback`
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: `Booking confirmed for ${updatedReservation.name} in ${updatedReservation.room}`,
      description: `Time Slot: ${updatedReservation.timeSlot} , Cake: ${
        updatedReservation.cake ?? "none"
      }, Name on Cake: ${
        updatedReservation.cake && updatedReservation.writingOnCake
          ? updatedReservation.writingOnCake
          : "none"
      }, Fog Entry: ${updatedReservation.fogEntry ?? "none"}`,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Kolkata",
      },
      colorId: "5",
      reminders: {
        useDefault: false,
        overrides: [{ method: "popup", minutes: 120 }],
      },
    };

    await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/dashboard");
    revalidatePath("/account");
  }
  return NextResponse.json({ status: "ok" }, { status: 203 });
}
