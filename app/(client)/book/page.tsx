import { notFound } from "next/navigation";
import StepTwo from "./components/StepTwo";
import { Steps } from "@/components/steps";
import { Metadata } from "next";
import StepThree from "./components/StepThree";
import StepOne from "./components/StepOne";
import StepFour from "./components/StepFour";

export const metadata: Metadata = {
  title: "Book a Slot",
};

export default function Book({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let step = Number(searchParams?.step);
  if (!step) {
    step = 1;
  }
  if (![1, 2, 3, 4].includes(step)) {
    return notFound();
  }
  return (
    <div className={"mt-[100px] container mx-auto"}>
      <Steps currentStep={step} />
      {step == 1 ? (
        <StepOne />
      ) : step == 2 ? (
        <StepTwo />
      ) : step == 3 ? (
        <StepThree />
      ) : step == 4 ? (
        <StepFour />
      ) : (
        <></>
      )}
    </div>
  );
}
