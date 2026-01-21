import { Metadata } from "next";
import { notFound } from "next/navigation";
import StepFour from "./components/StepFour";
import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";
import StepTwo from "./components/StepTwo";

export const metadata: Metadata = {
  title: "Book a Slot",
};

export default async function Book({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let step = Number(params?.step);
  if (!step) {
    step = 1;
  }
  if (![1, 2, 3, 4].includes(step)) {
    return notFound();
  }
  return (
    <div className={"container mx-auto mt-[100px]"}>
      {/* <Steps currentStep={step} /> */}
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
