import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { phoneNumber } from "better-auth/plugins";
import { admin } from "better-auth/plugins/admin";
import prisma from "./lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  advanced: {
    generateId: false,
  },
  session: {
    expiresIn: 3600 * 24,
    updateAge: 3600,
  },
  plugins: [
    admin({
      impersonationSessionDuration: 60 * 10, // 10 minutes
    }),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, request) => {
        const res = await fetch("https://graph.facebook.com/v21.0/541328782390732/messages", {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json", // Corrected header key
          },
          cache: "no-cache",
          method: "POST",
          body: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: `91${phoneNumber}`,
            type: "text",
            text: {
              body: `Your Login OTP is ${code}`,
            },
          }),
        });
        console.log(await res.json());
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@gmail.com`;
        },
        //optionally you can alos pass `getTempName` function to generate a temporary name for the user
        getTempName: (phoneNumber) => {
          return phoneNumber; //by default it will use the phone number as the name
        },
      },
    }),
  ],
});
