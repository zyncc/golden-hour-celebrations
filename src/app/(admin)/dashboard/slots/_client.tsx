"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DREAMSCAPE_TIME_SLOTS,
  ELITE_TIME_SLOTS,
  ROYAL_TIME_SLOTS,
} from "@/lib/constants";
import type { ReservationDetails } from "@/lib/types";
import { FormatDate, isSlotUnavailable } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SlotsClient({
  reservations,
}: {
  reservations: ReservationDetails[];
}) {
  const currentDate = new Date();
  const [date, setDate] = useState<string | undefined>(FormatDate(currentDate));
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
      const res = await fetch(`/api/fetchReservations?date=${date}`);
      const data: ReservationDetails[] = await res.json();
      return data;
    },
  });
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <Card className="h-fit w-fit mx-auto lg:mx-0">
        <CardContent>
          <Calendar
            mode="single"
            disabled={{ before: currentDate }}
            startMonth={currentDate}
            endMonth={nextMonthDate}
            selected={new Date(date!)}
            onSelect={(date) => {
              setDate(FormatDate(date!));
            }}
          />
        </CardContent>
      </Card>
      <div className="grid w-full flex-1 grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>DreamScape Theatre</CardHeader>
          <CardContent className="grid grid-cols-1 gap-5">
            {DREAMSCAPE_TIME_SLOTS.map((slot) => {
              const unavailable = isSlotUnavailable(
                slot,
                "Dreamscape Theatre",
                data,
                date!,
              );
              return (
                <Button
                  key={slot}
                  disabled={unavailable}
                  variant={unavailable ? "destructive" : "outline"}
                  className={`flex-1 whitespace-nowrap ${unavailable && "line-through"}`}
                >
                  {slot}
                </Button>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Elite Theatre</CardHeader>
          <CardContent className="grid grid-cols-1 gap-5">
            {ELITE_TIME_SLOTS.map((slot) => {
              const unavailable = isSlotUnavailable(slot, "Elite Theatre", data, date!);
              return (
                <Button
                  key={slot}
                  disabled={unavailable}
                  variant={unavailable ? "destructive" : "outline"}
                  className={`flex-1 whitespace-nowrap ${unavailable && "line-through"}`}
                >
                  {slot}
                </Button>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>The Royal Theatre</CardHeader>
          <CardContent className="grid grid-cols-1 gap-5">
            {ROYAL_TIME_SLOTS.map((slot) => {
              const unavailable = isSlotUnavailable(slot, "The Royal", data, date!);
              return (
                <Button
                  key={slot}
                  disabled={unavailable}
                  variant={unavailable ? "destructive" : "outline"}
                  className={`flex-1 whitespace-nowrap ${unavailable && "line-through"}`}
                >
                  {slot}
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
