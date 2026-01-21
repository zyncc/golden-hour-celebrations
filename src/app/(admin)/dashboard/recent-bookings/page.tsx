import { auth } from "@/auth";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { RecentReservationsTable } from "@/components/dashboard/recent-bookings-table";
import prisma from "@/lib/prisma";
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

  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
      date: {
        gte: startOfMonth,
        lte: startOfNextMonth,
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
