import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { phoneNumber } from "better-auth/plugins";
import { admin } from "better-auth/plugins/admin";
import prisma from "./lib/prisma";
import { sendLoginOTP } from "./actions/whatsapp.action";

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
      sendOTP: async ({ phoneNumber, code }) => {
        const accountExists = await prisma.user.findUnique({
          where: {
            phoneNumber,
          },
        });
        if (accountExists) {
          sendLoginOTP(phoneNumber, code);
        } else {
          throw new APIError("BAD_REQUEST", {
            message: "No Account found with this Phone Number",
          });
        }
      },
    }),
  ],
});
