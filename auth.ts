import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
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
      sendOTP: async ({ phoneNumber, code }) => {
        const accountExists = await prisma.user.findUnique({
          where: {
            phoneNumber,
          },
        });
        if (accountExists) {
          await fetch(
            `https://graph.facebook.com/v21.0/${process.env.WA_PHONE_NUMBER_ID}/messages`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CLOUD_API_ACCESS_TOKEN}`,
              },
              body: JSON.stringify({
                to: `91${phoneNumber}`,
                type: "template",
                messaging_product: "whatsapp",
                template: {
                  name: "login_otp",
                  language: {
                    code: "en",
                  },
                  components: [
                    {
                      type: "body",
                      parameters: [
                        {
                          type: "text",
                          text: code,
                        },
                      ],
                    },
                    {
                      type: "button",
                      sub_type: "url",
                      index: "0",
                      parameters: [
                        {
                          type: "text",
                          text: code,
                        },
                      ],
                    },
                  ],
                },
              }),
            }
          );
        } else {
          throw new APIError("BAD_REQUEST", {
            message: "No Account found with this Phone Number",
          });
        }
      },
    }),
  ],
});
