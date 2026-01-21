import { auth } from "@/auth";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SlotsClient from "./_client";

export default async function SlotsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  }

  const currentDate = new Date();
  const reservations = await prisma.reservations.findMany({
    where: {
      date: currentDate,
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
    <DashboardWrapper title="Slots">
      <SlotsClient reservations={reservations} />
    </DashboardWrapper>
  );
}
