"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { dreamscapeTimeSlots, majesticTimeSlots } from "@/lib/constants";
import { ReservationDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SlotsClient({
  reservations,
}: {
  reservations: ReservationDetails[];
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const currentDate = new Date();
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  const { data } = useQuery({
    queryKey: ["getReservation", date?.toISOString()],
    initialData: reservations,
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    enabled: !!date,
    queryFn: async () => {
      const res = await fetch(
        `/api/fetchReservations?date=${date?.getFullYear()}-${date?.getMonth()! + 1}-${date?.getDate()}`
      );
      const data: ReservationDetails[] = await res.json();
      return data;
    },
  });
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <Card className="w-fit h-fit">
        <CardContent>
          <Calendar
            mode="single"
            fromDate={currentDate}
            toMonth={nextMonthDate}
            selected={date}
            onSelect={(date) => {
              setDate(date);
            }}
          />
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>DreamScape Theatre</CardHeader>
        <CardContent className="grid grid-cols-1 gap-5">
          {dreamscapeTimeSlots.map((slot) => (
            <Button
              key={slot}
              disabled={
                !!data?.find(
                  (reservation) =>
                    reservation.timeSlot === slot &&
                    reservation.room === "Dreamscape Theatre"
                )
              }
              className={`flex-1 whitespace-nowrap ${
                data?.find(
                  (reservation) =>
                    reservation.timeSlot == slot &&
                    reservation.room == "Dreamscape Theatre"
                )
                  ? "bg-destructive hover:bg-destructive/80"
                  : "bg-transparent hover:bg-transparent text-white border"
              }`}
            >
              {slot}
            </Button>
          ))}
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>Majestic Theatre</CardHeader>
        <CardContent className="grid grid-cols-1 gap-5">
          {majesticTimeSlots.map((slot) => (
            <Button
              key={slot}
              disabled={
                !!data?.find(
                  (reservation) =>
                    reservation.timeSlot === slot &&
                    reservation.room === "Majestic Theatre"
                )
              }
              className={`flex-1 whitespace-nowrap ${
                data?.find(
                  (reservation) =>
                    reservation.timeSlot == slot &&
                    reservation.room == "Majestic Theatre"
                )
                  ? "bg-destructive hover:bg-destructive/80"
                  : "bg-transparent hover:bg-transparent text-white border"
              }`}
            >
              {slot}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
