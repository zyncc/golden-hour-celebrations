import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });
          if (!user) {
            throw new Error("User not found.");
          }
          if (user?.password != undefined) {
            const comparePassword = bcrypt.compareSync(
              credentials.password as string,
              user?.password
            );
            if (!comparePassword) {
              throw new Error("Invalid email or password");
            }
          }
          return user;
        } catch (error) {
          console.log(error);
          throw new Error();
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24 * 30,
  },
});
