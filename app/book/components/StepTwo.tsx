"use client";

import { Button } from "@/components/ui/button";
import { useReservation } from "@/context/ReservationStore";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Reservations } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import formatCurrency from "@/lib/formatCurrency";
import { items } from "@/lib/constants";

export default function StepTwo() {
  const { reservation, setReservationData } = useReservation();
  if (reservation == undefined) {
    redirect("/book");
  }
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<{
    room: string | undefined;
    time: string | undefined;
    price: number | undefined;
  }>({
    room: undefined,
    time: undefined,
    price: undefined,
  });

  function handleNextButton() {
    if (
      selectedPackage.room == undefined ||
      selectedPackage.time == undefined
    ) {
      toast({
        title: "Select a time slot",
        variant: "destructive",
        duration: 3000,
      });
    } else {
      setReservationData({
        ...reservation,
        room: selectedPackage.room,
        timeSlot: selectedPackage.time,
        price: selectedPackage.price,
      });
      router.push("?step=3", {
        scroll: true,
      });
    }
  }

  const timeSlots = [
    "10AM - 12PM",
    "12PM - 2PM",
    "2PM - 4PM",
    "4PM - 6PM",
    "6PM - 8PM",
    "8PM - 10PM",
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnFocusIn: false }),
  ]);
  const { data, isLoading } = useQuery({
    queryKey: ["getReservation"],
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await fetch(
        `/api/fetchReservations?date=${reservation?.date?.toISOString()}`
      );
      return res.json();
    },
  });
  return (
    <div className={"mt-10 mb-24 w-full flex"}>
      <div className="flex flex-col w-full justify-center bg-black">
        <div className="w-full mx-auto flex-grow">
          <div className="space-y-6 pb-6">
            {items.map((pkg, index) => (
              <Card
                key={index}
                className="relative overflow-hidden rounded-xl bg-black border-zinc-800"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden">
                    <Image
                      src={pkg.photo[0]}
                      alt={`${pkg.room} celebration scene`}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 md:p-6 md:w-1/2 flex flex-col">
                    <div className="space-y-4 mb-6">
                      {pkg.popular && (
                        <Badge className="bg-rose-500/90 hover:bg-rose-500 text-white border-none font-medium">
                          Most Popular
                        </Badge>
                      )}
                      <h2 className="text-2xl font-bold text-white">
                        {pkg.room}
                      </h2>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-white">
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6 flex-grow">
                      {pkg.description.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-zinc-300"
                        >
                          <svg
                            className="w-5 h-5 mr-2 text-rose-500 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {/* Time Slots */}
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          disabled={
                            data?.find(
                              (reservation: Reservations) =>
                                reservation.timeSlot == slot &&
                                pkg.room == reservation.room &&
                                reservation.paymentStatus
                            ) || isLoading
                          }
                          variant={
                            selectedPackage.time == slot &&
                            selectedPackage.room == pkg.room
                              ? "default"
                              : data?.find(
                                  (reservation: Reservations) =>
                                    reservation.timeSlot == slot &&
                                    pkg.room == reservation.room &&
                                    reservation.paymentStatus
                                )
                              ? "destructive"
                              : "outline"
                          }
                          onClick={() => {
                            toast({
                              title: `Selected ${pkg.room}`,
                              description: `Time - ${slot}`,
                              variant: "default",
                              duration: 3000,
                            });
                            setSelectedPackage({
                              room: pkg.room,
                              time: slot,
                              price: pkg.price,
                            });
                          }}
                          className={"flex-1"}
                        >
                          10 AM - 12 PM
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="sticky bottom-0 bg-black pt-4 pb-4">
            <div className="flex gap-4">
              <Button
                type={"submit"}
                className={"flex-1"}
                variant={"outline"}
                onClick={() => {
                  router.push("?step=1", {
                    scroll: true,
                  });
                }}
              >
                Back
              </Button>
              <Button
                type={"submit"}
                className={"flex-1"}
                variant={"default"}
                onClick={handleNextButton}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
