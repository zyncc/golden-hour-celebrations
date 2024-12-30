"use client";

import React, { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useReservation } from "@/app/context/ReservationStore";
import { StepOneFormSchema } from "@/lib/zodSchemas";
import { Label } from "@/components/ui/label";
import { CreateUser } from "@/actions/createUser";

export default function StepOneForm() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let nextMonth = currentMonth + 1;
  let nextYear = currentDate.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }
  let nextMonthDate = new Date(nextYear, nextMonth, 1);
  const router = useRouter();
  const { setReservationData, reservation } = useReservation();
  const [date, setDate] = useState<Date | undefined>(reservation?.date);
  const [errors, setErrors] = useState<z.ZodIssue[]>();

  function handleFormSubmit(FormData: FormData) {
    const formData = Object.fromEntries(FormData);
    let validation;
    if (date) {
      validation = StepOneFormSchema.safeParse({ ...formData, date });
    } else {
      const resDate = reservation?.date as Date;
      validation = StepOneFormSchema.safeParse({ ...formData, resDate });
    }
    if (validation.success) {
      CreateUser(validation.data);
      setDate(validation.data.date);
      setReservationData(undefined);
      setReservationData(validation.data);
      router.push("/book?step=2", {
        scroll: true,
      });
    } else {
      setErrors(validation.error.issues);
    }
  }

  return (
    <div className={"mt-10 flex"}>
      <div
        className={
          "flex w-full items-center mb-8 justify-center flex-col gap-y-5"
        }
      >
        <form
          className="space-y-8 w-full"
          action={(formData) => handleFormSubmit(formData)}
        >
          <div className="flex flex-col gap-y-3">
            <Label htmlFor="name">Enter your Name</Label>
            <Input
              placeholder={"Name"}
              name="name"
              defaultValue={reservation?.name}
            />
            {errors?.map((error) => {
              if (error.path[0] == "name") {
                return (
                  <p
                    className="text-sm text-red-600 font-medium"
                    key={error.path[0]}
                  >
                    {error.message}
                  </p>
                );
              }
            })}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label>Enter your Whatsapp Number</Label>
            <Input
              placeholder="Phone"
              type="text"
              maxLength={10}
              minLength={10}
              name="phone"
              defaultValue={reservation?.phone}
            />
            {errors?.map((error) => {
              if (error.path[0] == "phone") {
                return (
                  <p
                    className="text-sm text-red-600 font-medium"
                    key={error.path[0]}
                  >
                    {error.message}
                  </p>
                );
              }
            })}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label>Enter your Email</Label>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              defaultValue={reservation?.email}
            />
            {errors?.map((error) => {
              if (error.path[0] == "email") {
                return (
                  <p
                    className="text-sm text-red-600 font-medium"
                    key={error.path[0]}
                  >
                    {error.message}
                  </p>
                );
              }
            })}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label>How did you find us?</Label>
            <select
              name="findus"
              defaultValue={reservation?.findus}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Instagram / Facebook">Instagram / Facebook</option>
              <option value="Google">Google</option>
              <option value="Word of mouth">Word of mouth</option>
            </select>
            {errors?.map((error) => {
              if (error.path[0] == "findus") {
                return (
                  <p
                    className="text-sm text-red-600 font-medium"
                    key={error.path[0]}
                  >
                    {error.message}
                  </p>
                );
              }
            })}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label>Choose Occasion</Label>
            <select
              name="occasion"
              defaultValue={reservation?.occasion}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Bride / Groom to be">Bride / Groom to be</option>
              <option value="Graduation Party">Graduation Party</option>
              <option value="Proposal">Proposal</option>
              <option value="Mom to be">Mom to be</option>
              <option value="Other Surprises">Other Surprises</option>
            </select>
            {errors?.map((error) => {
              if (error.path[0] == "occasion") {
                return (
                  <p
                    className="text-sm text-red-600 font-medium"
                    key={error.path[0]}
                  >
                    {error.message}
                  </p>
                );
              }
            })}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label>Pick your Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  fromDate={currentDate}
                  toMonth={nextMonthDate}
                  selected={date}
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>
            {errors?.map((error) => {
              if (error.path[0] == "date") {
                return (
                  <p
                    className="text-sm text-red-600 font-medium"
                    key={error.path[0]}
                  >
                    {error.message}
                  </p>
                );
              }
            })}
          </div>
          <Button type={"submit"} className="w-full" variant={"outline"}>
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
