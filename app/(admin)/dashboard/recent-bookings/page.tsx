import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import formatCurrency from "@/lib/formatCurrency";

async function Page() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect("/dashboard/signin");
  }

  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
  const startOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
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
    <div className={"mt-10 container"}>
      <h1 className={"text-2xl font-medium mb-5"}>Recent Reservations</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Balance Amount</TableHead>
              <TableHead>Advance Amount</TableHead>
              <TableHead>No of People</TableHead>
              <TableHead>Event Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className={"whitespace-nowrap"}>
                  {new Date(reservation.date).toLocaleDateString("en-GB", {
                    timeZone: "Asia/Kolkata",
                    weekday: "short",
                    month: "short",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell className="font-medium whitespace-nowrap">
                  <Link href={`/dashboard/all-bookings/${reservation.id}`}>
                    {reservation.name}
                  </Link>
                </TableCell>
                <TableCell className={"whitespace-nowrap"}>
                  {reservation.timeSlot}
                </TableCell>
                <TableCell>{reservation.room}</TableCell>
                <TableCell>
                  {formatCurrency(reservation.balanceAmount)}
                </TableCell>
                <TableCell>
                  {formatCurrency(reservation.advanceAmount)}
                </TableCell>
                <TableCell>{reservation.noOfPeople}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    {reservation.occasion}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {reservations.length == 0 && (
              <TableRow>
                <TableCell>No Bookings found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Page;
