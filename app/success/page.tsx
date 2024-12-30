import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatCurrency from "@/lib/formatCurrency";
import prisma from "@/lib/prisma";
import { Check, Clock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const orderID = searchParams?.orderId as string;
  const booking = await prisma.reservations.findUnique({
    where: {
      orderID,
      paymentStatus: true,
    },
  });
  if (!booking) {
    return notFound();
  }
  return (
    <div className="min-h-screen dark bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-500">
            <Check className="h-6 w-6" />
            Booking Confirmed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Balance Amount</p>
              <p className="font-medium text-foreground">
                {formatCurrency(booking.balanceAmount)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Package</p>
              <p className="font-medium text-foreground">{booking.room}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Time Slot</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium text-foreground">
                  {booking.timeSlot}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Occasion</p>
              <p className="font-medium text-foreground">{booking.occasion}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Customer Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{booking.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{booking.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{booking.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Order Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium font-mono text-foreground">
                  {booking.orderID}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Payment ID</p>
                <p className="font-medium font-mono text-foreground">
                  {booking.paymentID}
                </p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <p className="text-emerald-500 font-medium">Paid</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Button asChild className="w-full">
            <Link href="/account">View All Your Bookings</Link>
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            A copy of this receipt has been sent to your email and WhatsApp
            number.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
