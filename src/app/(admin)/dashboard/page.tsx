import { auth } from "@/auth";
import { AllBookingsTable } from "@/components/dashboard/all-bookings-table";
import { ChartBarInteractive } from "@/components/dashboard/chart-area-interactive";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { RecentReservationsTable } from "@/components/dashboard/recent-bookings-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { endOfYear, startOfYear } from "date-fns";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  const startOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  const startOfThisYear = startOfYear(now);
  const endOfThisYear = endOfYear(now);

  const [bookingCount, userCount, recentReservations, allReservations] =
    await Promise.all([
      prisma.reservations.count({ where: { paymentStatus: true } }),
      prisma.user.count(),
      prisma.reservations.findMany({
        where: {
          paymentStatus: true,
          createdAt: {
            gte: startOfThisYear,
            lt: endOfThisYear,
          },
        },
        orderBy: {
          createdAt: "asc",
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
      <ChartBarInteractive reservations={recentReservations} />
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Bookings</TabsTrigger>
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
