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
    .toZonedDateTime({ timeZone: TIME_ZONE })
    .toInstant();

  const dayStartDate = new Date(startInstant.epochMilliseconds);
  const dayEndDate = new Date(endInstant.epochMilliseconds);
  const windowStart = new Date(startInstant.epochMilliseconds - 12 * 60 * 60 * 1000);
  const windowEnd = new Date(endInstant.epochMilliseconds + 12 * 60 * 60 * 1000);

  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
      OR: [
        {
          slotStartTime: { lt: dayEndDate },
          slotEndTime: { gt: dayStartDate },
        },
        {
          date: {
            gte: windowStart,
            lt: windowEnd,
          },
        },
      ],
    },
    select: {
      paymentStatus: true,
      date: true,
      room: true,
      timeSlot: true,
      slotStartTime: true,
      slotEndTime: true,
      duration: true,
      occasion: true,
    },
  });
  return (
    <DashboardWrapper title="Slots">
      <SlotsClient reservations={reservations} />
    </DashboardWrapper>
  );
}
