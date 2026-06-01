"use server";

import { Reservation } from "@/context/ReservationStore";
import {
  ADDITIONAL_PERSON_PRICE,
  ADVANCE_AMOUNT,
  BLUEBERRY_CHEESE_CAKE_PRICE,
  CAKE_PRICE,
  CANDLE_LIGHT_ROSE_PATH,
  DREAMSCAPE_THEATRE_PRICE,
  ELITE_THEATRE_PRICE,
  FOG_EFFECT_PRICE,
  LED_LETTER_LIGHT_AGE,
  LED_LETTER_LIGHT_NAME,
  MIDNIGHT_CHARGE,
  PHOTOGRAPHY_AND_VIDEO_PRICE,
  PHOTOGRAPHY_PRICE,
  RASMALAI_CAKE_PRICE,
  THE_ROYAL_THEATRE_ADVANCE_AMOUNT,
  THE_ROYAL_THEATRE_PRICE,
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
    price = DREAMSCAPE_THEATRE_PRICE;
  } else if (reservation.room === "Elite Theatre") {
    price = ELITE_THEATRE_PRICE;
  } else if (reservation.room === "The Royal") {
    price = THE_ROYAL_THEATRE_PRICE;
  } else {
    return {
      success: false,
      error: `Invalid room: ${reservation.room}`,
    };
  }

  let advanceAmountPrice =
    reservation?.room == "The Royal" ? THE_ROYAL_THEATRE_ADVANCE_AMOUNT : ADVANCE_AMOUNT;

  if (reservation.cake) {
    if (reservation.cake == "Rasmalai Cake") {
      price += RASMALAI_CAKE_PRICE;
      advanceAmountPrice += RASMALAI_CAKE_PRICE;
    } else if (reservation.cake == "Blueberry Cheese Cake") {
      price += BLUEBERRY_CHEESE_CAKE_PRICE;
      advanceAmountPrice += BLUEBERRY_CHEESE_CAKE_PRICE;
    } else {
      price += CAKE_PRICE;
      advanceAmountPrice += CAKE_PRICE;
    }
  }

  if (reservation.ledLetterName) {
    price += LED_LETTER_LIGHT_NAME;
  }

  if (reservation.ledLetterAge) {
    price += LED_LETTER_LIGHT_AGE;
  }

  if (reservation.fogEntry) {
    price += FOG_EFFECT_PRICE;
    advanceAmountPrice += FOG_EFFECT_PRICE;
  }

  if (reservation.rosePath) price += CANDLE_LIGHT_ROSE_PATH;

  if (
    reservation.timeSlot === "10PM - 12AM" ||
    reservation.timeSlot === "10:30PM - 12:30AM"
  ) {
    price += MIDNIGHT_CHARGE;
  }

  if (reservation.photography === "photoshoot") price += PHOTOGRAPHY_PRICE;
  if (reservation.photography === "video") price += PHOTOGRAPHY_AND_VIDEO_PRICE;

  let priceIncreaseForAdditionalPeople = 0;
  if (reservation.room == "Dreamscape Theatre" && reservation.noOfPeople! > 2) {
    priceIncreaseForAdditionalPeople =
      (reservation.noOfPeople! - 2) * ADDITIONAL_PERSON_PRICE;
  } else if (reservation.room == "Elite Theatre" && reservation.noOfPeople! > 4) {
    priceIncreaseForAdditionalPeople =
      (reservation.noOfPeople! - 4) * ADDITIONAL_PERSON_PRICE;
  } else if (reservation.room == "The Royal" && reservation.noOfPeople! > 15) {
    priceIncreaseForAdditionalPeople =
      (reservation.noOfPeople! - 15) * ADDITIONAL_PERSON_PRICE;
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
