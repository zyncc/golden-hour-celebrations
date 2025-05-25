"use server";

import { Reservation } from "@/context/ReservationStore";
import Razorpay from "razorpay";
import { advanceAmount, cakePrice } from "@/lib/constants";

export async function createOrder(
  payFull: boolean,
  reservation: Reservation | undefined
) {
  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
  });

  let price = reservation?.price!;

  if (reservation?.cake) price += cakePrice;

  if (reservation?.fogEntry) price += 400;

  if (reservation?.rosePath) price += 400;

  if (reservation?.photography === "30") price += 700;

  if (reservation?.photography === "60") price += 1000;

  let priceIncreaseForAdditionalPeople = 0;
  if (
    reservation?.room == "Dreamscape Theatre" &&
    reservation.noOfPeople! > 2
  ) {
    priceIncreaseForAdditionalPeople = (reservation.noOfPeople! - 2) * 200;
  } else if (
    reservation?.room == "Majestic Theatre" &&
    reservation.noOfPeople! > 4
  ) {
    priceIncreaseForAdditionalPeople = (reservation.noOfPeople! - 4) * 200;
  }

  price += priceIncreaseForAdditionalPeople;

  const response = await instance.orders.create({
    amount: payFull ? price * 100 : advanceAmount * 100,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  return response.id;
}
