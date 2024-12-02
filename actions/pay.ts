// "use server";

// import sha256 from "crypto-js/sha256";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import { redirect } from "next/navigation";
// import prisma from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// export async function Pay(
//   data: {
//     phone: string;
//     theatre: "standard-theatre" | "romantic-theatre";
//     branch: string;
//     occasion: string;
//     email: string;
//     time: string;
//     noOfPeople: "2" | "3" | "4" | "5" | "6";
//     bookingName: string;
//     cake?: string | undefined;
//     gifts?: string | undefined;
//     decoration?: string | undefined;
//   },
//   date: Date | undefined,
//   noOfPeople: number
// ) {
//   const mtrID = uuidv4().split("-")[0];
//   const payload = {
//     merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
//     merchantTransactionId: mtrID,
//     merchantUserId: "MUID123",
//     amount: 75000,
//     redirectUrl:
//       process.env.NODE_ENV == "development"
//         ? `http://localhost:3000/payment/${mtrID}`
//         : `https://goldenhourcelebrations.in/payment/${mtrID}`,
//     redirectMode: "REDIRECT",
//     callbackUrl:
//       process.env.NODE_ENV == "development"
//         ? "https://e2f8-106-51-216-201.ngrok-free.app/api/validatePayment"
//         : "https://goldenhourcelebrations.in/api/validatePayment",
//     mobileNumber: data.phone,
//     paymentInstrument: {
//       type: "PAY_PAGE",
//     },
//   };
//   const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
//   const checksum =
//     sha256(base64Payload + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY) +
//     "###" +
//     process.env.NEXT_PUBLIC_SALT_INDEX;

//   const options = {
//     method: "POST",
//     url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//       "X-VERIFY": checksum,
//     },
//     data: {
//       request: base64Payload,
//     },
//   };
//   let subTotal = -750;
//   if (data.cake !== "none") {
//     subTotal += 600;
//   }
//   if (data.decoration !== "none") {
//     subTotal += 500;
//   }
//   if (data.gifts !== "none") {
//     subTotal += 500;
//   }
//   if (data.theatre == "romantic-theatre") {
//     subTotal += 1800;
//   }
//   if (data.theatre == "standard-theatre" && Number(data.noOfPeople) == 2) {
//     subTotal += 1000;
//   } else if (
//     data.theatre == "standard-theatre" &&
//     Number(data.noOfPeople) == 5
//   ) {
//     subTotal += 1200;
//   } else if (
//     data.theatre == "standard-theatre" &&
//     Number(data.noOfPeople) == 6
//   ) {
//     subTotal += 1400;
//   }
//   console.log("SUBTOTAL - ", subTotal);
//   const response = await axios.request(options);
//   if (response.data.code == "PAYMENT_INITIATED" && date !== undefined) {
//     const checkIfBookingTimeExists = await prisma.reservations.findFirst({
//       where: {
//         timeSlot: data.time as string,
//         date,
//         paymentStatus: true,
//       },
//     });
//     if (checkIfBookingTimeExists) {
//       revalidatePath("/booking");
//       throw new Error(
//         "This time slot is already booked. Please choose another time or date"
//       );
//     } else {
//       await prisma.reservations.create({
//         data: {
//           merchantTransactionID: mtrID,
//           balanceAmount: subTotal,
//           room: data.theatre as string,
//           timeSlot: data.time as string,
//           date,
//           occasion: data.occasion as string,
//           name: data.bookingName as string,
//           phone: data.phone as string,
//           email: data.email as string,
//         },
//       });
//       redirect(response.data.data.instrumentResponse.redirectInfo.url);
//     }
//   }
// }
