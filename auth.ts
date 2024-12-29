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
    expiresIn: 3600 * 24 * 31,
    updateAge: 3600,
  },
  plugins: [
    admin({
      defaultRole: "user",
    }),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, request) => {
        const accountExists = await prisma.user.findUnique({
          where: {
            phoneNumber,
          },
        });
        if (accountExists) {
          await fetch(
            "https://graph.facebook.com/v21.0/541328782390732/messages",
            {
              headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
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
            }
          );
        } else {
          throw new Error("No Account with this Phone Number exists");
        }
      },
    }),
  ],
});
