"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function BookingCalendar() {
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let nextMonth = currentMonth + 1;
  let nextYear = currentDate.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }
  let nextMonthDate = new Date(nextYear, nextMonth, 1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      showOutsideDays={false}
      required
      fromDate={currentDate}
      toMonth={nextMonthDate}
      mode="single"
      selected={date}
      onDayClick={(day) => {
        console.log(day);
      }}
      onSelect={setDate}
      className="rounded-md w-fit border"
    />
  );
}
