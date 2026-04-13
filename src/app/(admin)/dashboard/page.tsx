import { AllBookingsTable } from "@/components/dashboard/all-bookings-table";
import { ChartBarInteractive } from "@/components/dashboard/chart-area-interactive";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { RecentReservationsTable } from "@/components/dashboard/recent-bookings-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TIME_ZONE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Temporal } from "@js-temporal/polyfill";

export default async function Page() {
  const now = Temporal.Now.zonedDateTimeISO(TIME_ZONE);

  // today IST at 00:00
  const startTodayInstant = now
    .toPlainDate()
    .toZonedDateTime({ timeZone: TIME_ZONE })
    .toInstant();

  // 1 week
  const oneWeek = now
    .toPlainDate()
    .add({ weeks: 1 })
    .toZonedDateTime({ timeZone: TIME_ZONE })
    .toInstant();

  const [bookingCount, userCount, recentReservations, allReservations] =
    await Promise.all([
      prisma.reservations.count({ where: { paymentStatus: true } }),
      prisma.user.count(),
      prisma.reservations.findMany({
        where: {
          paymentStatus: true,
          date: {
            gte: new Date(startTodayInstant.epochMilliseconds),
            lt: new Date(oneWeek.epochMilliseconds),
          },
        },
        orderBy: {
          date: "asc",
        },
      }),
      prisma.reservations.findMany({
        where: {
          paymentStatus: true,
        },
        orderBy: {
          date: "desc",
        },
      }),
    ]);

  const money = allReservations.reduce((total, reservation) => {
    return (
      total +
      (reservation.advanceAmount + reservation.balanceAmount) -
      (reservation.discount ?? 0)
    );
  }, 0);

  return (
    <DashboardWrapper title="Dashboard">
      <SectionCards revenue={money} bookingCount={bookingCount} userCount={userCount} />
      <ChartBarInteractive reservations={allReservations} />
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value={"recent"}>
          <RecentReservationsTable data={recentReservations} />
        </TabsContent>
        <TabsContent value={"all"}>
          <AllBookingsTable data={allReservations} />
        </TabsContent>
      </Tabs>
    </DashboardWrapper>
  );
}
