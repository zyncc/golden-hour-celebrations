import { notFound } from "next/navigation";
import StepOneForm from "./components/stepOneForm";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import { Steps } from "@/components/steps";
import { Metadata } from "next";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";

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
  if (![1, 2, 3, 4, 5].includes(step)) {
    return notFound();
  }
  return (
    <div className={"mt-[100px] container mx-auto"}>
      {/* <Steps currentStep={step} /> */}
      {step == 1 ? (
        <StepOneForm />
      ) : step == 2 ? (
        <StepTwo />
      ) : step == 3 ? (
        <StepThree />
      ) : step == 4 ? (
        <StepFour />
      ) : step == 5 ? (
        <StepFive />
      ) : (
        <></>
      )}
    </div>
  );
}
