import { AllBookingsTable } from "@/components/dashboard/all-bookings-table";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import prisma from "@/lib/prisma";

async function AllBookings() {
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
