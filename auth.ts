import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { admin } from "better-auth/plugins/admin";
import prisma from "./lib/prisma";
import { Resend } from "resend";
import LoginOTP from "./emails/login-otp";

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
  trustedOrigins: ["https://tuna-darling-overly.ngrok-free.app"],
  plugins: [
    admin({
      defaultRole: "user",
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const accountExists = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (accountExists) {
          const resend = new Resend(process.env.RESEND_API_KEY);
          const emailSent = await resend.emails.send({
            from: "Golden Hour Celebrations <info@goldenhourcelebrations.in>",
            to: [email],
            subject: "Your Login OTP for Golden Hour Celebrations",
            react: LoginOTP({ verificationCode: otp }),
          });
        } else {
          throw new APIError("BAD_REQUEST", {
            message: "No Account found with this Email id Exists",
          });
        }
      },
    }),
  ],
});
