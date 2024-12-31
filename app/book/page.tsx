"use client";

import { notFound, useSearchParams } from "next/navigation";
import StepOneForm from "./components/stepOneForm";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import { items } from "@/lib/constants";
import { Steps } from "@/components/steps";

export default function Book() {
  const searchParams = useSearchParams();
  let step = Number(searchParams.get("step"));
  if (!step) {
    step = 1;
  }
  if (![1, 2, 3].includes(step)) {
    return notFound();
  }
  return (
    <div className={"mt-[100px] container mx-auto"}>
      <Steps currentStep={step} />
      {step == 1 ? (
        <StepOneForm />
      ) : step == 2 ? (
        <StepTwo items={items} />
      ) : step == 3 ? (
        <StepThree />
      ) : (
        <></>
      )}
    </div>
  );
}
