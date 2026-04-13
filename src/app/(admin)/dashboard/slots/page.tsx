import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { TIME_ZONE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Temporal } from "@js-temporal/polyfill";
import SlotsClient from "./_client";

export default async function SlotsPage() {
  const todayIST = Temporal.Now.plainDateISO(TIME_ZONE);

  const startInstant = todayIST.toZonedDateTime({ timeZone: TIME_ZONE }).toInstant();

  // Start of next day IST → UTC instant (exclusive end)
  const endInstant = todayIST
    .add({ days: 1 })
    .subtract({ seconds: 1 })
    .toZonedDateTime({ timeZone: TIME_ZONE })
    .toInstant();

  const reservations = await prisma.reservations.findMany({
    where: {
      date: {
        gte: new Date(startInstant.epochMilliseconds),
        lt: new Date(endInstant.epochMilliseconds),
      },
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
