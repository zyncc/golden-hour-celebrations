"use client";

import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import StepOneForm from "./components/stepOneForm";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";

const items = [
  {
    id: 1,
    theatre: "Family Theatre",
    noPeople: 7,
    decoration: "₹750 extra",
    price: 1399,
    photo: [
      "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  {
    id: 2,
    theatre: "Family Theatre",
    noPeople: 7,
    decoration: "₹750 extra",
    price: 1399,
    photo: [
      "https://images.pexels.com/photos/7507067/pexels-photo-7507067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7180617/pexels-photo-7180617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  {
    id: 2,
    theatre: "Family Theatre",
    noPeople: 7,
    decoration: "₹750 extra",
    price: 1399,
    photo: [
      "https://images.pexels.com/photos/7507067/pexels-photo-7507067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7180617/pexels-photo-7180617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
];

export default function Book() {
  const searchParams = useSearchParams();
  const packages = Number(searchParams.get("package"));
  let step = Number(searchParams.get("step"));
  if (!step) {
    step = 1;
  }

  return (
    <div className={"mt-[100px] container mx-auto"}>
      <div
        className={
          "flex rounded-full py-2 justify-center gap-x-10 items-center font-medium text-md flex-wrap gap-y-3"
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
