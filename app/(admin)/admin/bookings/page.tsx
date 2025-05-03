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
import { notFound } from "next/navigation";
import { auth } from "@/auth";

async function Page() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return notFound();
  }
  const date = new Date();
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
      date: {
        gte: dateOnly,
      },
    },
    orderBy: {
      date: "asc",
    },
    select: {
      name: true,
      phone: true,
      room: true,
      timeSlot: true,
      occasion: true,
      date: true,
      paymentID: true,
    },
  });
  return (
    <div className={"mt-[100px] container"}>
      <h1 className={"text-2xl font-medium mb-5"}>Reservations</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {reservation.name}
                </TableCell>
                <TableCell>
                  <Link href={"tel:" + reservation.phone}>
                    {reservation.phone}
                  </Link>
                </TableCell>
                <TableCell>{reservation.room}</TableCell>
                <TableCell className={"whitespace-daterap"}>
                  {reservation.timeSlot}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    {reservation.occasion}
                  </span>
                </TableCell>
                <TableCell className={"whitespace-daterap"}>
                  {reservation.date.toLocaleDateString("en-GB", {
                    timeZone: "Asia/Kolkata",
                    weekday: "short",
                    month: "short",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell>{reservation.paymentID}</TableCell>
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
