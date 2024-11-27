import { capitalizeFirstLetter } from "@/lib/caplitaliseFirstLetter";
import formatCurrency from "@/lib/formatCurrency";
import prisma from "@/lib/prisma";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await prisma.reservations.findFirst({
    where: {
      merchantTransactionID: params.id,
    },
  });
  if (!response) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="font-medium text-xl">Reservation not Found</h1>
      </div>
    );
  } else {
    return (
      <div className="container mt-[100px]">
        {response.paymentStatus == true ? (
          <div>
            <div className="flex gap-x-2 items-center font-medium text-2xl">
              <RiVerifiedBadgeFill color="green" size={40} />
              <h1>Payment Succesful</h1>
            </div>
            <div className="flex flex-col gap-y-2 mt-5 text-lg">
              <h1>Transaction ID: {response.merchantTransactionID}</h1>
              <h1>Branch: {capitalizeFirstLetter(response.branch)}</h1>
              <h1>Theatre: {response.theatre}</h1>
              <h1>Time: {response.timeSlot}</h1>
              <h1>Booking Name: {capitalizeFirstLetter(response.name)}</h1>
              <h1>Email: {response.email}</h1>
              <h1>Occasion: {response.occasion}</h1>
              <h1>Cake: {response.cake}</h1>
              <h1>Extra Decoration: {response.extraDecoration}</h1>
              <h1>Gifts: {response.gifts}</h1>
              <h1>
                Balance Amount:{" "}
                <span className="font-semibold">
                  {formatCurrency(response.balanceAmount)}
                </span>
              </h1>
            </div>
            <h1 className="mt-5 font-semibold italic">
              A Receipt of this will be sent to your Email
            </h1>
          </div>
        ) : (
          "PAYMENT FAILED ❌"
        )}
      </div>
    );
  }
}
