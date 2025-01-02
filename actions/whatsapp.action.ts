"use server";

import WhatsApp from "whatsapp";

export async function sendLoginOTP(phoneNumber: string, code: string) {
  const wa = new WhatsApp();
  const recipient_number = Number(`91${phoneNumber}`);
  wa.messages.text({ body: `Your Login OTP is ${code}` }, recipient_number);
}
