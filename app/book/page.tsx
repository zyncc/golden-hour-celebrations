"use client";

import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";
import { notFound, useSearchParams } from "next/navigation";
import StepOneForm from "./components/stepOneForm";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import { items } from "@/lib/constants";

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
      <div
        className={
          "grid grid-cols-2 md:grid-cols-3 md:place-items-center place-items-start rounded-full py-2 justify-center gap-x-10 items-center font-medium text-md flex-wrap gap-y-3"
        }
      >
        <div>
          <h1
            className={`${
              step == 1 && "text-yellow-500"
            } flex items-center gap-x-3 font-medium`}
          >
            <TbCircleNumber1Filled
              color={`step == 1 ? "#eab308" : "#ffffff"`}
              fontSize={"40px"}
            />
            Choose Date
          </h1>
        </div>
        <div>
          <h1
            className={`${
              step == 2 && "text-yellow-500"
            } flex items-center gap-x-3 font-medium`}
          >
            <TbCircleNumber2Filled
              color={`step == 2 ? "#eab308" : "#ffffff"`}
              fontSize={"40px"}
            />
            Select Package
          </h1>
        </div>
        <div>
          <h1
            className={`${
              step == 3 && "text-yellow-500"
            } flex items-center gap-x-3 font-medium`}
          >
            <TbCircleNumber3Filled
              color={`step == 3 ? "#eab308" : "#ffffff"`}
              fontSize={"40px"}
            />
            Payment
          </h1>
        </div>
      </div>
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
