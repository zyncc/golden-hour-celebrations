"use client";

import { createOrder } from "@/actions/createOrder";
import { createReservation } from "@/actions/createReservation";
import { updateReservation } from "@/actions/updateReservation";
import { useReservation } from "@/app/context/ReservationStore";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { SiRazorpay } from "react-icons/si";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { authClient } from "@/lib/authClient";

export default function StepThree() {
  const { reservation } = useReservation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const { Razorpay } = useRazorpay();
  // const session = authClient.useSession();
  if (!reservation) {
    redirect("?step=1");
  }

  async function handlePayButton() {
    // if (!session.data?.session) {
    //   setOpen(true);
    //   return;
    // }
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
  const phoneSchema = z.object({
    phone: z.string({ message: "Phone is required" }).regex(/^[6-9]\d{9}$/, {
      message: "Invalid phone number",
    }),
  });
  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });
  const onSubmitPhone = (data: { phone: string }) => {
    console.log("Phone submitted:", data.phone);
    setIsPhoneSubmitted(true);
    authClient.phoneNumber.sendOtp({
      phoneNumber: data.phone,
    });
  };

  const onSubmitOTP = () => {
    console.log("OTP submitted:", otpValue);
    authClient.phoneNumber.verify({
      phoneNumber: "9148106357",
      code: otpValue,
      fetchOptions: {
        onSuccess(context) {
          console.log(context);
        },
      },
    });
  };
  const handleSubmit = isPhoneSubmitted
    ? onSubmitOTP
    : form.handleSubmit((data) => onSubmitPhone(data));

  return (
    <div className={"mt-10 flex flex-col gap-3"}>
      <h1>{reservation.room}</h1>
      <h1>{reservation.occasion}</h1>
      <h1>{reservation.name}</h1>
      <h1>{reservation.email}</h1>
      <h1>{reservation.phone}</h1>
      <h1>{formatCurrency(reservation.price as number)}</h1>
      <h1>
        Balance Amount - {formatCurrency((reservation.price as number) - 500)}
      </h1>
      <div className="flex gap-x-2 w-screen">
        <Link href={"?step=2"}>
          <Button variant={"outline"} className="w-full flex-1">
            Back
          </Button>
        </Link>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login to Continue</DialogTitle>
              <DialogDescription>
                {isPhoneSubmitted
                  ? "Enter the OTP sent to your WhatsApp"
                  : "Enter your WhatsApp Phone Number to Login"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-8">
                {!isPhoneSubmitted ? (
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <InputOTP
                    pattern={REGEXP_ONLY_DIGITS}
                    maxLength={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    className="w-full"
                  >
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot index={0} className="flex-1" />
                      <InputOTPSlot index={1} className="flex-1" />
                      <InputOTPSlot index={2} className="flex-1" />
                      <InputOTPSlot index={3} className="flex-1" />
                      <InputOTPSlot index={4} className="flex-1" />
                      <InputOTPSlot index={5} className="flex-1" />
                    </InputOTPGroup>
                  </InputOTP>
                )}
                <Button type="submit" className="w-full" variant="outline">
                  {isPhoneSubmitted ? "Verify OTP" : "Submit"}
                </Button>
              </form>
            </Form>
            {isPhoneSubmitted && (
              <Button
                variant="link"
                onClick={() => setIsPhoneSubmitted(false)}
                className="mt-2"
              >
                Change Phone Number
              </Button>
            )}
          </DialogContent>
        </Dialog>
        <form action={handlePayButton}>
          <Button
            variant={"default"}
            className="bg-[#eab308] text-black w-full"
            type="submit"
          >
            <SiRazorpay color="black" size={50} />
            Pay with Razorpay
          </Button>
        </form>
      </div>
    </div>
  );
}
