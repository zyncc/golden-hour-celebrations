import { auth } from "@/auth";
import { AllBookingsTable } from "@/components/dashboard/all-bookings-table";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function AllBookings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  }

  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <DashboardWrapper title="All Bookings">
      <AllBookingsTable data={reservations} />
    </DashboardWrapper>
  );
}

export default AllBookings;
