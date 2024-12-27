"use client";

import {createOrder} from "@/actions/createOrder";
import {createReservation} from "@/actions/createReservation";
import {updateReservation} from "@/actions/updateReservation";
import {useReservation} from "@/app/context/ReservationStore";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {redirect} from "next/navigation";
import React from "react";
import {RazorpayOrderOptions, useRazorpay} from "react-razorpay";
import {Check, CreditCard} from 'lucide-react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import formatCurrency from "@/lib/formatCurrency";
import {items} from "@/lib/constants";
import {useRouter} from  "next/navigation"
import Link from "next/link"

export default function StepThree() {
  const { reservation } = useReservation();
  const { Razorpay } = useRazorpay();
  const router = useRouter()
  if (!reservation) {
    redirect("?step=1");
  }
  async function handlePayButton() {
    const orderID: string = await createOrder();
    const err = await createReservation(reservation!, orderID);
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
      amount: 500 * 100,
      currency: "INR",
      name: "Golden Hour Celebrations",
      description: reservation?.room,
      order_id: orderID,
      handler: ({ razorpay_order_id, razorpay_payment_id }) => {
        updateReservation(razorpay_order_id, razorpay_payment_id);
        router.push(`/success?${razorpay_order_id}`)
      },
      modal: {
        backdropclose: false,
        escape: false,
        handleback: false,
        confirm_close: true,
        animation: true,
      },
      // callback_url: "http://localhost:3000/",
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
                      <span className="text-muted-foreground">{reservation.room}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Occasion</span>
                      <span className="text-muted-foreground">{reservation.occasion}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Time</span>
                      <span className="text-muted-foreground">{reservation.timeSlot}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Date</span>
                      <span className="text-muted-foreground">{reservation.date?.toDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Customer Name</span>
                      <span className="text-muted-foreground">{reservation.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Email</span>
                      <span className="text-muted-foreground">{reservation.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Phone</span>
                      <span className="text-muted-foreground">{reservation.phone}</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="font-medium mb-2">Package Includes:</p>
                    <div className="space-y-2">
                      {items.find((item) => item.room == reservation.room)?.description.map((desc, i) => (
                          <div key={i} className="flex items-center text-sm text-muted-foreground">
                            <Check className="mr-2 h-4 w-4 text-primary"/>
                            {desc}
                          </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Link href={"/book?step=2"}><Button variant={'outline'} className={'w-full mt-4'}>Back</Button></Link>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package Price</span>
                    <span className={'font-semibold'}>{formatCurrency(reservation.price as number)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance Amount (Pay after event)</span>
                    <span className="text-green-600 font-semibold whitespace-nowrap">- {formatCurrency(reservation.price as number - 500)}</span>
                  </div>
                  <Separator/>
                  <div className="flex justify-between text-lg font-medium">
                    <span>Advance Amount</span>
                    <span className={'font-semibold'}>{formatCurrency(500)}</span>
                  </div>
                  <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-300" size="lg" onClick={() => handlePayButton()}>
                    <CreditCard className="mr-2 h-4 w-4"/>
                    Pay with Razorpay
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
