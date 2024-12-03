import { SendReceipt } from "@/actions/emails";
import prisma from "@/lib/prisma";
import axios from "axios";
import { SHA256 } from "crypto-js";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { response } = await req.json();
  const decodedResponse = Buffer.from(response, "base64").toString("utf-8");
  const parsedResponse = JSON.parse(decodedResponse);
  console.log("Decoded Response:", parsedResponse);

  if (parsedResponse.success) {
    const mtrID = parsedResponse.data.merchantTransactionId;
    try {
      const checksum =
        SHA256(
          `/pg/v1/status/${process.env.MERCHANT_ID}/${mtrID}` +
            process.env.SALT_KEY
        ) +
        "###" +
        process.env.SALT_INDEX;
      const options = {
        method: "get",
        url: `${
          process.env.NODE_ENV == "development"
            ? "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status"
            : "https://api.phonepe.com/apis/hermes/v1/status"
        }/${process.env.MERCHANT_ID}/${mtrID}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": process.env.MERCHANT_ID,
        },
      };
      const response = await axios.request(options);
      if (response.data.code == "PAYMENT_SUCCESS") {
        revalidatePath("/booking");
        await prisma.reservations.update({
          where: {
            merchantTransactionID: mtrID,
          },
          data: {
            paymentStatus: true,
            paymentTransactionID: response.data.data.transactionId,
          },
        });
        SendReceipt(mtrID);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
