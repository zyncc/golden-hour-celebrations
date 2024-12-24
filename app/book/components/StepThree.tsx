"use client";

import { Payy } from "@/actions/payy";
import { useReservation } from "@/app/context/ReservationStore";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import formatCurrency from "@/lib/formatCurrency";
import { redirect } from "next/navigation";
import React from "react";
import { SiPhonepe } from "react-icons/si";

export default function StepThree() {
  const { reservation } = useReservation();
  if (!reservation) {
    redirect("?step=1");
  }
  async function handlePayButton() {
    const err = await Payy(reservation!, 500);
    if (err?.title) {
      toast({
        title: err.title,
        description: err.description,
        variant: "destructive",
      });
      redirect("?step=1");
    }
  }
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
      <form action={handlePayButton}>
        <Button
          variant={"default"}
          className="bg-[#5f259f] hover:bg-[#5f259f] text-white w-full"
          type="submit"
        >
          <SiPhonepe color="white" size={50} />
          Pay with PhonePe
        </Button>
      </form>
    </div>
  );
}
