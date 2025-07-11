import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins/admin";
import prisma from "./lib/prisma";
import { nextCookies } from "better-auth/next-js";

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
  advanced: {
    generateId: false,
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
    "https://admin.goldenhourcelebrations.in",
  ],
  plugins: [
    admin({
      defaultRole: "user",
    }),
    nextCookies(),
  ],
});
