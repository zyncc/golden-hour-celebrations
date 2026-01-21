import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { admin } from "better-auth/plugins/admin";
import prisma from "./lib/prisma";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  logger: {
    disabled: false,
    level: "error",
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV !== "development",
      domain: ".goldenhourcelebrations.in",
    },
  },
  socialProviders: {
    google: {
      enabled: true,
      prompt: "select_account",
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 3600 * 24 * 31,
    updateAge: 3600,
    cookieCache: {
      enabled: true,
      maxAge: 3600,
    },
  },
  trustedOrigins: [
    "http://admin.localhost:3000",
    "http://localhost:3000",
    "https://goldenhourcelebrations.in",
    "https://admin.goldenhourcelebrations.in",
  ],
  plugins: [
    admin({
      defaultRole: "user",
    }),
    phoneNumber(),
    nextCookies(),
  ], // make sure this is the last plugin in the array
});
