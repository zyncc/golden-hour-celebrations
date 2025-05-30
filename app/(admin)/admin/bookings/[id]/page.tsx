import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Camera,
  Cake,
  Sparkles,
  Heart,
  User,
  Building,
} from "lucide-react";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return notFound();
  }
  const { id } = params;
  const reservation = await prisma.reservations.findUnique({
    where: {
      id,
    },
  });

  if (!reservation) {
    return notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(date));
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[100px] max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reservation Details</h1>
        <p className="text-muted-foreground">
          Reservation ID: {reservation.id}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Event Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(reservation.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Time Slot</p>
                <p className="font-medium">{reservation.timeSlot}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Building className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Room</p>
                <p className="font-medium">{reservation.room}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Number of People</p>
                <p className="font-medium">{reservation.noOfPeople} people</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Heart className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Occasion</p>
                <p className="font-medium">{reservation.occasion}</p>
              </div>
            </div>

            {reservation.nameToDisplay && (
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Display Name</p>
                  <p className="font-medium">{reservation.nameToDisplay}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{reservation.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <Link target="_blank" href={`tel:${reservation.phone}`}>
                  <p className="font-medium">{reservation.phone}</p>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <Link target="_blank" href={`mailto:${reservation.email}`}>
                  <p className="font-medium">{reservation.email}</p>
                </Link>
              </div>
            </div>

            {reservation.findUs && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">How did you find us?</p>
                  <p className="font-medium">{reservation.findUs}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Advance Amount</span>
              <span className="font-medium">
                {formatCurrency(reservation.advanceAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Balance Amount</span>
              <span className="font-medium">
                {formatCurrency(reservation.balanceAmount)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>
                {formatCurrency(
                  reservation.advanceAmount + reservation.balanceAmount
                )}
              </span>
            </div>
            {reservation.discount > 0 && (
              <div className="flex items-center justify-between text-green-600">
                <span className="text-sm">Discount Applied</span>
                <span className="font-medium">
                  -{formatCurrency(reservation.discount)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Payment Status</span>
              <Badge
                variant={reservation.paymentStatus ? "default" : "destructive"}
              >
                {reservation.paymentStatus ? "Paid" : "Pending"}
              </Badge>
            </div>

            {reservation.orderID && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="font-mono text-sm">{reservation.orderID}</span>
              </div>
            )}

            {reservation.paymentID && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Payment ID</span>
                <span className="font-mono text-sm">
                  {reservation.paymentID}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add-ons & Extras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Add-ons & Extras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reservation.cake && (
              <div className="flex items-center gap-3">
                <Cake className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Cake</p>
                  <p className="font-medium">{reservation.cake}</p>
                </div>
              </div>
            )}

            {reservation.photography && (
              <div className="flex items-center gap-3">
                <Camera className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Photography</p>
                  <p className="font-medium">{reservation.photography}</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-start gap-x-3">
                <span className="text-sm text-gray-500">Fog Entry</span>
                <Badge variant={reservation.fogEntry ? "default" : "outline"}>
                  {reservation.fogEntry ? "Yes" : "No"}
                </Badge>
              </div>

              <div className="flex items-center justify-start gap-x-3">
                <span className="text-sm text-gray-500">Rose Path</span>
                <Badge variant={reservation.rosePath ? "default" : "outline"}>
                  {reservation.rosePath ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
            {!reservation.cake &&
              !reservation.photography &&
              !reservation.fogEntry &&
              !reservation.rosePath && (
                <p className="text-gray-500 text-sm italic">
                  No add-ons selected
                </p>
              )}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Other Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">
                {formatDateTime(reservation.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">
                {formatDateTime(reservation.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
