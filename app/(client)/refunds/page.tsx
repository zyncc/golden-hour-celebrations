import {
  AlertTriangle,
  Ban,
  Calendar,
  CreditCard,
  HelpCircle,
  RefreshCcw,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8 mt-[60px]">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            No Refund & No Cancellation Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Please read our strict no-refund and no-cancellation policy
            carefully before making a purchase.
          </p>
        </div>

        {/* Main Alert */}
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            All sales are final. We do not offer refunds or cancellations under
            any circumstances.
          </AlertDescription>
        </Alert>

        {/* Policy Details */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Ban className="h-6 w-6 text-destructive" />
                <CardTitle>No Cancellations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Once a purchase is made, it cannot be cancelled. All bookings
                are final and binding.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-destructive" />
                <CardTitle>No Refunds</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We maintain a strict no-refund policy. The amount paid is
                non-refundable under any circumstances.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-destructive" />
                <CardTitle>Booking Responsibility</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Please ensure you select the correct date and time for your
                booking. Changes cannot be accommodated after purchase.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <RefreshCcw className="h-6 w-6 text-destructive" />
                <CardTitle>No Rescheduling</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Rescheduling of bookings is not permitted. Please make sure you
                can attend before making a purchase.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6" />
              <CardTitle>Questions?</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              If you have any questions about our policy, please contact us
              before making a purchase:
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <Link
                href={"mailto:goldenhourcelebrationsblr@gmail.com"}
                className="text-muted-foreground"
              >
                goldenhourcelebrationsblr@gmail.com
              </Link>
              <p className="text-muted-foreground">Phone: 9739204918</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Last updated: December 2024</p>
          <p className="mt-1">
            This policy is subject to change without notice. Please review
            periodically for updates.
          </p>
        </div>
      </div>
    </div>
  );
}
