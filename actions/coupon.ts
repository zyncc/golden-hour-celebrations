"use server";

import prisma from "@/lib/prisma";

export async function checkCoupon(formData: FormData) {
  const code = formData.get("coupon") as string;
  const res = await prisma.coupons.findUnique({
    where: {
      code,
    },
  });
  if (!res) {
    return false;
  } else {
    return res;
  }
}

export async function createCoupon(formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log(data);
  await prisma.coupons.create({
    data: {
      code: data.code as string,
      discountType: data.discountType as string,
      discountAmount: Number(data.discountAmount),
    },
  });
}
