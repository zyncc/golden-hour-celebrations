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

async function Page() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect("/dashboard/signin");
  }
  const nowUtc = new Date();
  const nowIst = new Date(nowUtc.getTime() + 5.5 * 60 * 60 * 1000);

  const istStart = new Date(
    nowIst.getFullYear(),
    nowIst.getMonth(),
    nowIst.getDate()
  );

  const utcStart = new Date(istStart.getTime() - 5.5 * 60 * 60 * 1000);

  const reservations = await prisma.reservations.findMany({
    where: {
      paymentStatus: true,
      date: {
        gte: utcStart,
      },
    },
    orderBy: {
      date: "asc",
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
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium whitespace-nowrap">
                  <Link href={`/dashboard/bookings/${reservation.id}`}>
                    {reservation.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={"tel:" + reservation.phone}>
                    {reservation.phone}
                  </Link>
                </TableCell>
                <TableCell>{reservation.room}</TableCell>
                <TableCell className={"whitespace-nowrap"}>
                  {reservation.timeSlot}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    {reservation.occasion}
                  </span>
                </TableCell>
                <TableCell className={"whitespace-nowrap"}>
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
