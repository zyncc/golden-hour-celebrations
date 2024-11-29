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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useReservation } from "@/app/context/ReservationStore";
import { StepOneFormSchema } from "@/lib/zodSchemas";

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
  const [date, setDate] = useState<Date | undefined>(undefined);
  const router = useRouter();

  const form = useForm<z.infer<typeof StepOneFormSchema>>({
    resolver: zodResolver(StepOneFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { setReservationData, reservation } = useReservation();

  function onSubmit(values: z.infer<typeof StepOneFormSchema>) {
    setReservationData(values);
    router.push("?step=2");
  }
  return (
    <div className={"mt-10 flex"}>
      <div
        className={"flex w-full items-center justify-center flex-col gap-y-5"}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Name"}
                      {...field}
                      defaultValue={reservation?.name}
                      value={field.value || reservation?.name}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your Whatsapp Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Phone"
                      type="text"
                      maxLength={10}
                      minLength={10}
                      value={field.value || reservation?.phone}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="findus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you find us?</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value || reservation?.findus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram / Facebook">
                          Instagram / Facebook
                        </SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Word of mouth">
                          Word of mouth
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Occasion</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value || reservation?.occasion}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Birthday">Birthday</SelectItem>
                        <SelectItem value="Anniversary">Anniversary</SelectItem>
                        <SelectItem value="Bride / Groom to be">
                          Bride / Groom to be
                        </SelectItem>
                        <SelectItem value="Graduation Party">
                          Graduation Party
                        </SelectItem>
                        <SelectItem value="Proposal">Proposal</SelectItem>
                        <SelectItem value="Mom to be">Mom to be</SelectItem>
                        <SelectItem value="Other Surprises">
                          Other Surprises
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick your Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value || reservation?.date ? (
                            format(field.value || reservation?.date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          showOutsideDays={false}
                          mode="single"
                          fromDate={currentDate}
                          toMonth={nextMonthDate}
                          selected={field.value || reservation?.date}
                          onSelect={field.onChange}
                          onDayClick={(day) => {
                            setDate(day);
                          }}
                          className="rounded-md w-fit border"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type={"submit"} className="w-full" variant={"outline"}>
              Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
