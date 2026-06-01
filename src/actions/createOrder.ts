"use server";

import { Reservation } from "@/context/ReservationStore";
import {
  advanceAmount,
  cakePrice,
  candleLightRosePath,
  ledLetterLightAge,
  ledLetterLightName,
} from "@/lib/constants";
import Razorpay from "razorpay";

export async function createOrder(
  payFull: boolean,
  reservation: Reservation | undefined,
) {
  if (!reservation) {
    return {
      success: false,
      error: "Reservation is undefined",
    };
  }

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
  });

  let price: number;

  if (reservation.room === "Dreamscape Theatre") {
    price = 1499;
  } else if (reservation.room === "Elite Theatre") {
    price = 1899;
  } else if (reservation.room === "The Royal") {
    price = 7499;
  } else {
    return {
      success: false,
      error: `Invalid room: ${reservation.room}`,
    };
  }

  let advanceAmountPrice = advanceAmount;

  if (reservation.cake) {
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

  if (reservation.ledLetterName) {
    price += ledLetterLightName;
  }

  if (reservation.ledLetterAge) {
    price += ledLetterLightAge;
  }

  if (reservation.fogEntry) {
    price += 400;
    advanceAmountPrice += 400;
  }

  if (reservation.rosePath) price += candleLightRosePath;

  if (
    reservation.timeSlot === "10PM - 12AM" ||
    reservation.timeSlot === "10:30PM - 12:30AM"
  ) {
    price += 500;
  }

  if (reservation.photography === "photoshoot") price += 700;
  if (reservation.photography === "video") price += 1500;

  let priceIncreaseForAdditionalPeople = 0;
  if (reservation.room == "Dreamscape Theatre" && reservation.noOfPeople! > 2) {
    priceIncreaseForAdditionalPeople = (reservation.noOfPeople! - 2) * 200;
  } else if (reservation.room == "Elite Theatre" && reservation.noOfPeople! > 4) {
    priceIncreaseForAdditionalPeople = (reservation.noOfPeople! - 4) * 200;
  } else if (reservation.room == "The Royal" && reservation.noOfPeople! > 15) {
    priceIncreaseForAdditionalPeople = (reservation.noOfPeople! - 15) * 200;
  }

  price += priceIncreaseForAdditionalPeople;

  const response = await instance.orders.create({
    amount: payFull ? price * 100 : advanceAmountPrice * 100,
    currency: "INR",
    receipt: "receipt#1",
  });

  return {
    success: true,
    orderId: response.id,
  };
}
