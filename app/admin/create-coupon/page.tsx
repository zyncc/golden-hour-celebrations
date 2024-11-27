import { createCoupon } from "@/actions/coupon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function Page() {
  return (
    <section className="container mt-[100px]">
      <h1 className="text-3xl font-semibold">Create Coupon</h1>
      <form action={createCoupon} className="flex flex-col gap-5 mt-10">
        <Label>Code</Label>
        <Input type="text" placeholder="Code" name="code" />
        <Label>Discount Type</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          name="discountType"
        >
          <option value="PERCENTAGE">Percentage</option>
          <option value="FLAT" selected>
            Flat
          </option>
        </select>
        <Label>Discount Amount</Label>
        <Input
          type="number"
          placeholder="Discount Amount"
          name="discountAmount"
        />
        <Label>Minimum Booking Amount</Label>
        <Input
          type="number"
          placeholder="Minimum Booking Amount"
          name="minBookingAmount"
        />
        <Button type="submit">Create</Button>
      </form>
    </section>
  );
}
