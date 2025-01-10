"use client";

import React, { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
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
import { useReservation } from "@/context/ReservationStore";
import { StepOneFormSchema } from "@/lib/zodSchemas";
import { Label } from "@/components/ui/label";
import { CreateUser } from "@/actions/createUser";
import Link from "next/link";

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
  const [open, setOpen] = useState(false);
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
    <div className={"my-16 flex gap-10 items-start flex-col md:flex-row"}>
      <div
        className={
          "flex w-full items-center mb-8 justify-center flex-1 flex-col"
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
            <Popover open={open} onOpenChange={setOpen}>
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
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
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
          <Button type={"submit"} className="w-full" variant={"default"}>
            Next
          </Button>
        </form>
      </div>
      <div className="space-y-6 rounded-lg w-full flex-1 bg-card p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Visit Us</h2>
          <div className="flex items-start space-x-2">
            <MapPin className="mt-1 h-5 w-5 shrink-0" />
            <p className="text-muted-foreground">
              1st floor, #66,
              <br />
              29th main, 29th A Cross Rd, Geetha Colony,
              <br />
              4th Block, Jayanagar, 560041
              <br />
              Call us
              <br />
              <Link href={"tel:9739204918"}>9739204918</Link>
            </p>
          </div>
        </div>
        {/* Google Maps Embed */}
        <div className="aspect-square overflow-hidden rounded-lg lg:aspect-[4/3]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.667895154625!2d77.58295797630976!3d12.929053887382432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15ccac350657%3A0xfeeb73c49998e57b!2sGolden%20Hour%20private%20theatre%20Celebration!5e0!3m2!1sen!2sin!4v1735631684154!5m2!1sen!2sin"
            className="invert-[90%]"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Opening Hours</h3>
          <p className="text-sm text-muted-foreground">
            Everyday: 9:00 AM - 9:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}
