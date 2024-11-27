"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "./ui/loadingSpinner";

export function CouponSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={"outline"}
      type="submit"
      disabled={pending}
      form="couponForm"
    >
      {pending ? <Spinner size={30} /> : "Apply"}
    </Button>
  );
}
