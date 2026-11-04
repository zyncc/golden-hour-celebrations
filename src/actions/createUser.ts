"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type user = {
  name: string;
  phone: string;
  email: string;
};

export async function CreateUser(user: user) {
  try {
    const email = user.email.trim().toLowerCase();
    const phoneNumber = user.phone.trim();
    const name = user.name.trim();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        emailVerified: false,
        phoneNumber,
        phoneNumberVerified: false,
        role: "user",
      },
    });

    revalidatePath("/dashboard");
    return newUser;
  } catch (e) {
    console.error("Error creating user:", e);
  }
}

