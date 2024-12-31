"use client";

import { createOrder } from "@/actions/createOrder";
import { createReservation } from "@/actions/createReservation";
import { useReservation } from "@/context/ReservationStore";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { Check, CreditCard, LoaderCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import formatCurrency from "@/lib/formatCurrency";
import { items } from "@/lib/constants";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export default function StepThree() {
  const { reservation } = useReservation();
  const { Razorpay } = useRazorpay();
  const [pending, setPending] = useState(false);
  const [payFull, setPayFull] = useState(false);
  if (!reservation) {
    redirect("?step=1");
  }
  async function handlePayButton() {
    setPending(true);
    const orderID: string = await createOrder(payFull, reservation);
    const err = await createReservation(payFull, reservation!, orderID);
    if (err) {
      toast({
        variant: "destructive",
        title: err.title,
        description: err.description,
        duration: 5000,
      });
      return;
    }
    const options: RazorpayOrderOptions = {
      key: process.env.RAZORPAY_KEY_ID as string,
      amount: payFull ? reservation?.price! * 100 : 500 * 100,
      currency: "INR",
      name: "Golden Hour Celebrations",
      description: reservation?.room,
      order_id: orderID,
      // handler: ({ razorpay_order_id, razorpay_payment_id }) => {
      //   setPending(false);
      // },
      modal: {
        backdropclose: false,
        escape: false,
        handleback: false,
        confirm_close: true,
        animation: true,
        ondismiss() {
          setPending(false);
        },
      },
      callback_url:
        process.env.NODE_ENV == "development"
          ? `http://localhost:3000/success?orderId=${orderID}`
          : `https://goldenhourcelebrations.in/success?orderId=${orderID}`,
      prefill: {
        name: reservation?.name,
        email: reservation?.email,
        contact: reservation?.phone,
      },
      allow_rotation: false,
      retry: {
        enabled: true,
      },
      remember_customer: true,
      theme: {
        hide_topbar: false,
      },
    };
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
    razorpayInstance.on("payment.failed", () => {
      setPending(false);
    });
  }
  return (
    <div className="min-h-screen bg-background py-4 md:p-8 dark">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-0">
            <Card>
              <CardHeader>
                <CardTitle>Package Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Package Type</span>
                    <span className="text-muted-foreground">
                      {reservation.room}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Occasion</span>
                    <span className="text-muted-foreground">
                      {reservation.occasion}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Time</span>
                    <span className="text-muted-foreground">
                      {reservation.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Date</span>
                    <span className="text-muted-foreground">
                      {reservation.date?.toDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Customer Name</span>
                    <span className="text-muted-foreground">
                      {reservation.name}
                    </span>
                  </div>
                  <div className="flex justify-between gap-x-3 items-center">
                    <span className="font-medium">Email</span>
                    <span className="text-muted-foreground">
                      {reservation.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Phone</span>
                    <span className="text-muted-foreground">
                      {reservation.phone}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="font-medium mb-2">Package Includes:</p>
                  <div className="space-y-2">
                    {items
                      .find((item) => item.room == reservation.room)
                      ?.description.map((desc, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          {desc}
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Link href={"/book?step=2"} scroll={true}>
              <Button variant={"outline"} className={"w-full mt-4"}>
                Back
              </Button>
            </Link>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package Price</span>
                  <span className={"font-semibold"}>
                    {formatCurrency(reservation.price as number)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Pay Full Price (Optional)
                  </span>
                  <span className={"font-semibold"}>
                    <Switch checked={payFull} onCheckedChange={setPayFull} />
                  </span>
                </div>
                {!payFull && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Balance Amount (Pay after event)
                    </span>
                    <span className="text-green-600 font-semibold whitespace-nowrap">
                      - {formatCurrency((reservation.price as number) - 500)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-medium">
                  <span>Advance Amount</span>
                  <span className={"font-semibold"}>
                    {payFull
                      ? formatCurrency(reservation.price as number)
                      : formatCurrency(500)}
                  </span>
                </div>
                <Button
                  className="w-full mt-4 bg-yellow-500 hover:bg-yellow-300"
                  size="lg"
                  disabled={pending}
                  onClick={() => handlePayButton()}
                >
                  {pending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay with Razorpay
                    </div>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Secure payment powered by Razorpay
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
