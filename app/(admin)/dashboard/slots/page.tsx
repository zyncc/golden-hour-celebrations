import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SlotsClient from "./_client";
import prisma from "@/lib/prisma";

export default async function SlotsPage() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect("/dashboard/signin");
  }
  const currentDate = new Date();
  const istDate = currentDate.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
  const reservations = await prisma.reservations.findMany({
    where: {
      date: istDate,
      paymentStatus: true,
    },
    select: {
      paymentStatus: true,
      date: true,
      room: true,
      timeSlot: true,
      occasion: true,
    },
  });
  return (
    <div className="container mt-10">
      <SlotsClient reservations={reservations} />
    </div>
  );
}
