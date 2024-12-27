"use server";

import prisma from "@/lib/prisma";
import { SendReceipt } from "./emails";
import { redirect } from "next/navigation";

export async function updateReservation(orderID: string, paymentID: string) {
  await prisma.reservations.update({
    where: {
      orderID,
    },
    data: {
      paymentStatus: true,
      paymentID,
    },
  });
  SendReceipt(orderID);
}
