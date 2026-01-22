"use client";

import { createOrder } from "@/actions/createOrder";
import { createReservation } from "@/actions/createReservation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useReservation } from "@/context/ReservationStore";
import {
  advanceAmount,
  cakePrice,
  candleLightRosePath,
  items,
  ledLetterLightAge,
  ledLetterLightName,
} from "@/lib/constants";
import formatCurrency from "@/lib/formatCurrency";
import { Check, CreditCard, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { toast } from "sonner";

export default function StepFour() {
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
      toast(err.title, {
        description: err.description,
        duration: 5000,
      });
      return;
    }
    const options: RazorpayOrderOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      amount: payFull ? reservation?.price! * 100 : advanceAmount * 100,
      currency: "INR",
      name: `Booking for ${reservation?.name} `,
      description: `in ${reservation?.room}`,
      order_id: orderID,
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
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${orderID}`
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
  let price = reservation?.price!;

  let advanceAmountPrice = advanceAmount;

  if (reservation?.cake) {
    if (reservation.cake == "Rasmalai Cake") {
      price += 800;
      advanceAmountPrice += 800;
    } else if (reservation.cake == "Blueberry Cheese Cake") {
      price += 900;
      advanceAmountPrice += 900;
    } else {
      price += cakePrice;
      advanceAmountPrice += cakePrice;
    }
  }
  if (reservation?.fogEntry) {
    price += 400;
    advanceAmountPrice += 400;
  }
  if (reservation?.rosePath) {
    price += candleLightRosePath;
  }
  if (reservation?.ledLetterName) {
    price += ledLetterLightName;
  }

  if (reservation?.ledLetterAge) {
    price += ledLetterLightAge;
  }
  if (
    reservation?.timeSlot === "10PM - 12AM" ||
    reservation?.timeSlot === "10:30PM - 12:30AM"
  ) {
    price += 500;
  }
  if (reservation?.photography === "photoshoot") {
    price += 700;
  }
  if (reservation?.photography === "video") {
    price += 1500;
  }
  let priceIncreaseForAdditionalPeople = 0;
  if (reservation?.room == "Dreamscape Theatre" && reservation.noOfPeople! > 2) {
    priceIncreaseForAdditionalPeople = (reservation.noOfPeople! - 2) * 200;
  } else if (reservation?.room == "Elite Theatre" && reservation.noOfPeople! > 4) {
    priceIncreaseForAdditionalPeople = (reservation.noOfPeople! - 4) * 200;
  }
  price += priceIncreaseForAdditionalPeople;
  return (
    <div className="min-h-screen py-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-0">
            <Card className="">
              <CardHeader>
                <CardTitle>Package Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Package Type</span>
                    <span>{reservation.room}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Occasion</span>
                    <span>{reservation.occasion}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Time</span>
                    <span>{reservation.timeSlot}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">No of People</span>
                    <span>{reservation.noOfPeople}</span>
                  </div>
                  {reservation.cake && reservation.writingOnCake && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Writing on Cake</span>
                      <span>{reservation.writingOnCake}</span>
                    </div>
                  )}
                  {reservation.nameToDisplay && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Name to Display</span>
                      <span>{reservation.nameToDisplay}</span>
                    </div>
                  )}
                  {reservation.ledLetterName && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">LED Letter Name</span>
                      <span>{reservation.ledLetterName}</span>
                    </div>
                  )}
                  {reservation.ledLetterAge && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">LED Letter Age</span>
                      <span>{reservation.ledLetterAge}</span>
                    </div>
                  )}
                  {reservation.specialRequests && (
                    <div className="flex items-center justify-between gap-5">
                      <span className="font-medium whitespace-nowrap">
                        Special Requests
                      </span>
                      <span className="text-muted-foreground line-clamp-1">
                        {reservation.specialRequests}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Date</span>
                    <span>{new Date(reservation.date!).toDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Customer Name</span>
                    <span>{reservation.name}</span>
                  </div>
                  <div className="flex items-center justify-between gap-x-3">
                    <span className="font-medium">Email</span>
                    <span>{reservation.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Phone</span>
                    <span>{reservation.phone}</span>
                  </div>
                  {reservation.cake && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Cake</span>
                      <span>{reservation.cake}</span>
                    </div>
                  )}
                  {reservation.photography && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Photography Package</span>
                      <span>
                        {reservation.photography === "photoshoot"
                          ? "Photoshoot"
                          : "Photography & Video"}
                      </span>
                    </div>
                  )}
                  {reservation.fogEntry && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Fog Entry</span>
                      <span>Added</span>
                    </div>
                  )}
                  {reservation.rosePath && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Rose Path</span>
                      <span>Added</span>
                    </div>
                  )}
                </div>
                <div className="rounded-lg p-4">
                  <p className="mb-2 font-medium">Package Includes:</p>
                  <div className="space-y-2">
                    {items
                      .find((item) => item.room == reservation.room)
                      ?.description.map((desc, i) => (
                        <div
                          key={i}
                          className="text-muted-foreground flex items-center text-sm"
                        >
                          <Check className="text-primary mr-2 h-4 w-4" />
                          {desc}
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Link href={"/book?step=3"} scroll={true}>
              <Button variant={"secondary"} className={"mt-4 w-full"}>
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
                  <span>Package Price</span>
                  <span className={"font-semibold"}>
                    {formatCurrency(reservation.price as number)}
                  </span>
                </div>
                {reservation.cake && (
                  <div className="flex justify-between">
                    <span>Cake - {reservation.cake}</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      +{" "}
                      {formatCurrency(
                        reservation.cake == "Blueberry Cheese Cake"
                          ? 900
                          : reservation.cake == "Rasmalai Cake"
                            ? 800
                            : cakePrice,
                      )}
                    </span>
                  </div>
                )}
                {reservation.photography && (
                  <div className="flex justify-between">
                    <span>Photography Package</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      +{" "}
                      {formatCurrency(
                        reservation.photography === "photoshoot" ? 700 : 1500,
                      )}
                    </span>
                  </div>
                )}
                {reservation.fogEntry && (
                  <div className="flex justify-between">
                    <span>Fog Entry</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      + {formatCurrency(400)}
                    </span>
                  </div>
                )}
                {reservation.rosePath && (
                  <div className="flex justify-between">
                    <span>Candle Light Rose Path</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      + {formatCurrency(candleLightRosePath)}
                    </span>
                  </div>
                )}
                {reservation.ledLetterName && (
                  <div className="flex justify-between">
                    <span>LED Letter Name</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      + {formatCurrency(ledLetterLightName)}
                    </span>
                  </div>
                )}
                {reservation.ledLetterAge && (
                  <div className="flex justify-between">
                    <span>LED Letter Age</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      + {formatCurrency(ledLetterLightAge)}
                    </span>
                  </div>
                )}
                {(reservation.timeSlot === "10PM - 12AM" ||
                  reservation.timeSlot === "10:30PM - 12:30AM") && (
                  <div className="flex justify-between">
                    <span>Midnight Slot Charges</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      + {formatCurrency(500)}
                    </span>
                  </div>
                )}
                {reservation.room == "Dreamscape Theatre" &&
                  reservation.noOfPeople! > 2 && (
                    <div className="flex justify-between">
                      <span>₹200 per Additional Person</span>
                      <span className="font-semibold whitespace-nowrap text-green-600">
                        + {formatCurrency(priceIncreaseForAdditionalPeople)}
                      </span>
                    </div>
                  )}
                {reservation.room == "Elite Theatre" && reservation.noOfPeople! > 4 && (
                  <div className="flex justify-between">
                    <span>₹200 per Additional Person</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      + {formatCurrency(priceIncreaseForAdditionalPeople)}
                    </span>
                  </div>
                )}
                {!payFull && <Separator />}
                {!payFull && (
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold whitespace-nowrap text-green-600">
                      {formatCurrency(price)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span>Pay Full Price (Optional)</span>
                  <span className={"font-semibold"}>
                    <Switch checked={payFull} onCheckedChange={setPayFull} />
                  </span>
                </div>
                <div className="flex justify-between text-lg font-medium">
                  <span>{payFull ? "Total" : "Advance Amount"}</span>
                  <span className={"font-semibold"}>
                    {payFull ? formatCurrency(price) : formatCurrency(advanceAmountPrice)}
                  </span>
                </div>
                {!payFull && (
                  <div className="flex justify-between text-lg font-medium">
                    <span>Balance Amount (Pay after event)</span>
                    <span className={"font-semibold"}>
                      {formatCurrency(price - advanceAmountPrice)}
                    </span>
                  </div>
                )}
                <Button
                  className="bg-primary mt-4 w-full"
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
                <p className="text-muted-foreground mt-4 text-center text-sm">
                  By creating a Reservation you are agreeing to our{" "}
                  <Link href={"/terms"} className="text-blue-600 underline">
                    terms
                  </Link>{" "}
                  &{" "}
                  <Link href={"/privacy"} className="text-blue-600 underline">
                    privacy policy
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
