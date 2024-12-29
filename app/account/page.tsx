import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (!session?.session) {
    redirect("/signin?callbackUrl=/account");
  }
  const bookings = await prisma.reservations.findMany({
    where: {
      phone: session.user.phoneNumber!,
    },
  });
  const date = new Date();
  const formattedDate = date.toDateString();
  return (
    <div className="mt-[100px] container">
      <h1 className="text-xl font-medium mb-5">Hello, {session.user.name}</h1>
      {bookings.length > 0 ? (
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
            {bookings.map((reservation, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {reservation.name}
                </TableCell>
                <TableCell>{reservation.phone}</TableCell>
                <TableCell>{reservation.room}</TableCell>
                <TableCell className={"whitespace-nowrap"}>
                  {reservation.timeSlot}
                </TableCell>
                <TableCell>
                  <span className="inline-flex whitespace-nowrap items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    {reservation.occasion}
                  </span>
                </TableCell>
                <TableCell className={"whitespace-nowrap"}>
                  {formattedDate === reservation.date.toDateString() ? (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-blue-700/10 dark:bg-green-400/10 dark:text-green-600 dark:ring-green-400/30">
                      Today
                    </span>
                  ) : (
                    reservation.date.toDateString()
                  )}
                </TableCell>
                <TableCell>{reservation.paymentID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full flex items-center">
          <h1>No Bookings Found</h1>
        </div>
      )}
    </div>
  );
}
