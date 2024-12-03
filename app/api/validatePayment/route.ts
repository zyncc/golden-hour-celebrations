import { SendReceipt } from "@/actions/emails";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { response } = await req.json();
  const decodedResponse = Buffer.from(response, "base64").toString("utf-8");
  const parsedResponse = JSON.parse(decodedResponse);
  console.log("Decoded Response:", parsedResponse);
  if (parsedResponse.success) {
    try {
      const mtrID = parsedResponse.data.merchantTransactionId;
      revalidatePath("/book");
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
    } catch (error) {
      console.log(error);
    }
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
