import { auth } from "@/auth";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { RecentReservationsTable } from "@/components/dashboard/recent-bookings-table";
import prisma from "@/lib/prisma";
import { endOfMonth, startOfDay } from "date-fns";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  }

  const now = new Date();
  const startToday = startOfDay(now);
  const endOfThisMonth = endOfMonth(now);

  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
      date: {
        gte: startToday,
        lte: endOfThisMonth,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <DashboardWrapper title="Recent Reservations">
      <RecentReservationsTable data={reservations} />
    </DashboardWrapper>
  );
}

export default Page;
