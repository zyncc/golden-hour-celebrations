"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { dreamscapeTimeSlots, EliteTimeSlots } from "@/lib/constants";
import type { ReservationDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SlotsClient({
  reservations,
}: {
  reservations: ReservationDetails[];
}) {
  const currentDate = new Date();
  const [date, setDate] = useState<Date | undefined>(currentDate);
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1,
  );
  const { data } = useQuery({
    queryKey: ["getReservation", date],
    initialData: reservations,
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    enabled: !!date,
    queryFn: async () => {
      const res = await fetch(`/api/fetchReservations?date=${date?.toISOString()}`);
      const data: ReservationDetails[] = await res.json();
      return data;
    },
  });
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <Card className="h-fit w-fit">
        <CardContent>
          <Calendar
            mode="single"
            disabled={{ before: currentDate }}
            startMonth={currentDate}
            endMonth={nextMonthDate}
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
                    reservation.room === "Dreamscape Theatre",
                )
              }
              variant={
                data?.some(
                  (reservation) =>
                    reservation.timeSlot === slot &&
                    reservation.room === "Dreamscape Theatre",
                )
                  ? "destructive"
                  : "secondary"
              }
              className={"flex-1 whitespace-nowrap"}
            >
              {slot}
            </Button>
          ))}
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>Elite Theatre</CardHeader>
        <CardContent className="grid grid-cols-1 gap-5">
          {EliteTimeSlots.map((slot) => (
            <Button
              key={slot}
              disabled={
                !!data?.find(
                  (reservation) =>
                    reservation.timeSlot === slot && reservation.room === "Elite Theatre",
                )
              }
              variant={
                data?.some(
                  (reservation) =>
                    reservation.timeSlot === slot &&
                    reservation.room === "Dreamscape Theatre",
                )
                  ? "destructive"
                  : "secondary"
              }
              className={"flex-1 whitespace-nowrap"}
            >
              {slot}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
