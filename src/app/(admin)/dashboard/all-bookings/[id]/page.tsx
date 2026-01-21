import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { notFound } from "next/navigation";

function formatValue(value: any, type?: string): string {
  if (value === null || value === undefined) return "";

  switch (type) {
    case "currency":
      return `₹${value.toLocaleString("en-IN")}`;
    case "date":
      return format(new Date(value), "PPP");
    case "boolean":
      return value ? "Yes" : "No";
    default:
      return String(value);
  }
}

interface FieldProps {
  label: string;
  value: any;
  type?: "currency" | "date" | "boolean" | "text";
}

function Field({ label, value, type }: FieldProps) {
  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <p className="text-muted-foreground mb-1 text-sm">{label}</p>
      <p className="text-foreground text-base font-medium">{formatValue(value, type)}</p>
    </div>
  );
}

export default async function ReservationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const orderId = (await params).id;
  const reservationData = await prisma.reservations.findUnique({
    where: {
      orderID: orderId,
    },
  });

  if (!reservationData) {
    return notFound();
  }

  const isConfirmed = reservationData.paymentStatus;

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-foreground text-3xl font-bold">Reservation Details</h1>
            <Badge
              variant={isConfirmed ? "default" : "secondary"}
              className="px-3 py-1 text-base"
            >
              {isConfirmed ? "Confirmed" : "Pending"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Reservation ID:{" "}
            <span className="text-foreground font-mono font-semibold">
              {reservationData.id}
            </span>
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Main Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reservationData.name && (
                  <Field label="Guest Name" value={reservationData.name} type="text" />
                )}
                {reservationData.nameToDisplay && (
                  <Field
                    label="Display Name"
                    value={reservationData.nameToDisplay}
                    type="text"
                  />
                )}
                {reservationData.phone && (
                  <Field label="Phone" value={reservationData.phone} type="text" />
                )}
                {reservationData.email && (
                  <Field label="Email" value={reservationData.email} type="text" />
                )}
                {reservationData.findUs && (
                  <Field
                    label="How did you find us?"
                    value={reservationData.findUs}
                    type="text"
                  />
                )}
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reservationData.occasion && (
                  <Field label="Occasion" value={reservationData.occasion} type="text" />
                )}
                {reservationData.date && (
                  <Field label="Date" value={reservationData.date} type="date" />
                )}
                {reservationData.timeSlot && (
                  <Field label="Time Slot" value={reservationData.timeSlot} type="text" />
                )}
                {reservationData.room && (
                  <Field label="Room" value={reservationData.room} type="text" />
                )}
                {reservationData.noOfPeople && (
                  <Field
                    label="Number of Guests"
                    value={reservationData.noOfPeople}
                    type="text"
                  />
                )}
              </CardContent>
            </Card>

            {/* Special Requests & Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Special Requests & Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reservationData.specialRequests && (
                  <Field
                    label="Special Requests"
                    value={reservationData.specialRequests}
                    type="text"
                  />
                )}
                {reservationData.writingOnCake && (
                  <Field
                    label="Cake Writing"
                    value={reservationData.writingOnCake}
                    type="text"
                  />
                )}
                {reservationData.notes && (
                  <Field label="Notes" value={reservationData.notes} type="text" />
                )}
              </CardContent>
            </Card>

            {/* Add-ons & Enhancements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Add-ons & Enhancements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reservationData.cake && (
                  <Field label="Cake" value={reservationData.cake} type="text" />
                )}
                {reservationData.photography && (
                  <Field
                    label="Photography"
                    value={reservationData.photography}
                    type="text"
                  />
                )}
                {reservationData.fogEntry && (
                  <Field
                    label="Fog Entry"
                    value={reservationData.fogEntry}
                    type="boolean"
                  />
                )}
                {reservationData.rosePath && (
                  <Field
                    label="Rose Path"
                    value={reservationData.rosePath}
                    type="boolean"
                  />
                )}
                {reservationData.ledLetterName && (
                  <Field
                    label="LED Letter Name"
                    value={reservationData.ledLetterName}
                    type="text"
                  />
                )}
                {reservationData.ledLetterAge && (
                  <Field
                    label="LED Letter Age"
                    value={reservationData.ledLetterAge}
                    type="text"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment & Booking Info */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 border-b pb-4">
                  <div className="flex items-start justify-between">
                    <span className="text-muted-foreground text-sm">Advance Amount</span>
                    <span className="text-foreground font-semibold">
                      ₹{reservationData.advanceAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-muted-foreground text-sm">Balance Amount</span>
                    <span className="text-foreground font-semibold">
                      ₹{reservationData.balanceAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {reservationData.discount ? (
                    <div className="flex items-start justify-between">
                      <span className="text-muted-foreground text-sm">Discount</span>
                      <span className="font-semibold text-green-600">
                        -{reservationData.discount}%
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-foreground font-semibold">Total Amount</span>
                  <span className="text-primary text-lg font-bold">
                    ₹
                    {(
                      reservationData.advanceAmount + reservationData.balanceAmount
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Booking Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reservationData.orderID && (
                  <Field label="Order ID" value={reservationData.orderID} type="text" />
                )}
                {reservationData.paymentID && (
                  <Field
                    label="Payment ID"
                    value={reservationData.paymentID}
                    type="text"
                  />
                )}
                {reservationData.manualBooking !== null && (
                  <Field
                    label="Manual Booking"
                    value={reservationData.manualBooking}
                    type="boolean"
                  />
                )}
                {reservationData.createdAt && (
                  <Field label="Created" value={reservationData.createdAt} type="date" />
                )}
                {reservationData.updatedAt && (
                  <Field
                    label="Last Updated"
                    value={reservationData.updatedAt}
                    type="date"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
