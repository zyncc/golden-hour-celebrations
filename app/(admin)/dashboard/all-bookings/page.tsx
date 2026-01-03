import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ReservationsTable } from "@/components/all-bookings-table";

async function AllBookings() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect("/dashboard/signin");
  }

  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
    },
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      name: true,
      timeSlot: true,
      room: true,
      balanceAmount: true,
      occasion: true,
      date: true,
    },
  });

  return (
    <div className={"mt-10 container"}>
      <h1 className={"text-2xl font-medium mb-5"}>All Bookings</h1>
      <ReservationsTable data={reservations} />
    </div>
  );
}

export default AllBookings;
