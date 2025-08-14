"use server";

import { Reservation } from "@/context/ReservationStore";
import Razorpay from "razorpay";
import {
  advanceAmount,
  cakePrice,
  candleLightRosePath,
  ledLetterLightAge,
  ledLetterLightName,
} from "@/lib/constants";

export async function createOrder(
  payFull: boolean,
  reservation: Reservation | undefined
) {
  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
  });

  let price = reservation?.price!;

  let advanceAmountPrice = advanceAmount;

  if (reservation?.cake) {
    if (reservation.cake == "Red velvet" || reservation.cake == "Rasmalai") {
      price += 620;
      advanceAmountPrice += 620;
    } else {
      price += cakePrice;
      advanceAmountPrice += cakePrice;
    }
  }

  if (reservation?.ledLetterName) {
    price += ledLetterLightName;
  }

  if (reservation?.ledLetterAge) {
    price += ledLetterLightAge;
  }

  if (reservation?.fogEntry) {
    price += 400;
    advanceAmountPrice += 400;
  }

  if (reservation?.rosePath) price += candleLightRosePath;

  if (
    reservation?.timeSlot === "10PM - 12AM" ||
    reservation?.timeSlot === "10:30PM - 12:30AM"
  ) {
    price += 500;
  }

  if (reservation?.photography === "photoshoot") price += 700;

  if (reservation?.photography === "video") price += 1500;

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
    amount: payFull ? price * 100 : advanceAmountPrice * 100,
    currency: "INR",
    receipt: "receipt#1",
  });

  return response.id;
}
