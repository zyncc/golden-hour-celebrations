import { auth } from "@/auth";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { RecentReservationsTable } from "@/components/dashboard/recent-bookings-table";
import { TIME_ZONE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Temporal } from "@js-temporal/polyfill";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  }

  const now = Temporal.Now.zonedDateTimeISO(TIME_ZONE);

  // today IST at 00:00
  const startTodayInstant = now
    .toPlainDate()
    .toZonedDateTime({ timeZone: TIME_ZONE })
    .toInstant();

  // end of month IST (exclusive)
  const endOfMonthInstant = now
    .toPlainDate()
    .with({ day: 1 })
    .add({ months: 1 })
    .toZonedDateTime({ timeZone: TIME_ZONE })
    .toInstant();

  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
      date: {
        gte: new Date(startTodayInstant.epochMilliseconds),
        lt: new Date(endOfMonthInstant.epochMilliseconds),
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <DashboardWrapper title="Recent Reservations">
      <RecentReservationsTable data={reservations} />
    </DashboardWrapper>
  );
}

export default Page;
