"use server";

import prisma from "@/lib/prisma";

type user = {
  name: string;
  phone: string;
  email: string;
};

export async function CreateUser(user: user) {
  try {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        emailVerified: false,
        phoneNumber: user.phone,
        phoneNumberVerified: false,
        role: "user",
      },
    });
  } catch (e) {
    console.log(e);
  }
}
