"use server";

import {z} from "zod"
import {StepOneFormSchema} from "@/lib/zodSchemas";
import prisma from "@/lib/prisma";

type user = z.infer<typeof StepOneFormSchema>

export async function CreateUser(user: user) {
    const validation = StepOneFormSchema.safeParse(user)
    if (!validation.success) {
        throw  new Error()
    }
    try{
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                emailVerified: false,
                phoneNumber: user.phone,
                phoneNumberVerified: false,
                role: "user",
            }
        })
    }
    catch (e) {
        console.log(e);
    }
}