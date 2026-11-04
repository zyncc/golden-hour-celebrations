"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SLOT_HOURS,
  getTimeSlotsForDuration,
} from "@/lib/constants";
import type { ReservationDetails } from "@/lib/types";
import { FormatDate, getAvailableSlotsCount, isSlotUnavailable } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const THEATRES = [
  { name: "Dreamscape Theatre", title: "Dreamscape Theatre" },
  { name: "Elite Theatre", title: "Elite Theatre" },
  { name: "The Royal", title: "The Royal Theatre" },
];

export default function SlotsClient({
  reservations,
}: {
  reservations: ReservationDetails[];
}) {
  const currentDate = new Date();
  const [date, setDate] = useState<string | undefined>(FormatDate(currentDate));
  const [duration, setDuration] = useState<number>(1);
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

  const slots = getTimeSlotsForDuration(duration);

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
      <div className="flex flex-1 flex-col gap-5 w-full">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Select Slot Hour</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2.5">
            {SLOT_HOURS.map((hr) => {
              const isSelected = duration === hr;
              return (
                <Button
                  key={hr}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => setDuration(hr)}
                  className="rounded-full px-5 font-medium"
                >
                  {hr} hour
                </Button>
              );
            })}
          </CardContent>
        </Card>

        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          {THEATRES.map((theatre) => {
            const availableCount = getAvailableSlotsCount(
              duration,
              theatre.name,
              data,
              date,
            );

            return (
              <Card key={theatre.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <span className="font-semibold text-lg">{theatre.title}</span>
                  <Badge variant={availableCount > 0 ? "outline" : "secondary"}>
                    {availableCount} slots available
                  </Badge>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {slots.map((slot) => {
                    const unavailable = isSlotUnavailable(
                      slot,
                      theatre.name,
                      data,
                      date!,
                    );
                    return (
                      <Button
                        key={slot}
                        disabled={unavailable}
                        variant={unavailable ? "destructive" : "outline"}
                        className={`flex-1 whitespace-nowrap text-xs sm:text-sm ${
                          unavailable ? "line-through opacity-80" : ""
                        }`}
                      >
                        {slot}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
