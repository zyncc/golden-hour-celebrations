"use client";

import { Button } from "@/components/ui/button";
import { useReservation } from "@/app/context/ReservationStore";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Reservations } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";

type Props = {
  id: number;
  room: string;
  noPeople: number;
  decoration: string;
  price: number;
  photo: string[];
}[];

export default function StepTwo({ items }: { items: Props }) {
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
      });
    } else {
      setReservationData({
        ...reservation,
        room: selectedPackage.room,
        timeSlot: selectedPackage.time,
        price: selectedPackage.price,
      });
      router.push("?step=3");
    }
  }

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
    <div className={"mt-10 w-full flex"}>
      <div className={"flex flex-col gap-y-5 w-full"}>
        <div
          className={
            "w-full grid gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-y-3 md:col-span-1 border border-muted rounded-md"
            >
              <div className="relative w-full aspect-w-16 aspect-h-9">
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container w-full h-full">
                    {item.photo.map((pic) => (
                      <div
                        className="embla__slide aspect-w-16 aspect-h-9"
                        key={pic}
                      >
                        <Image
                          priority
                          src={pic}
                          alt="Package Image"
                          fill
                          className="rounded-tl-md rounded-tr-md object-cover aspect-video"
                          fetchPriority="high"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={"px-3"}>
                <h1 className={"font-semibold"}>{item.room}</h1>
                <h1>Upto {item.noPeople} people</h1>
                <h1>Decoration {item.decoration}</h1>
                <h1 className={"font-semibold"}>₹{item.price}</h1>
              </div>
              <div className={"grid grid-cols-3 gap-3 px-3"}>
                <Button
                  disabled={
                    data?.find(
                      (reservation: Reservations) =>
                        reservation.timeSlot == "10AM - 12PM" &&
                        item.room == reservation.room &&
                        reservation.paymentStatus
                    ) || isLoading
                  }
                  variant={
                    selectedPackage.time == "10AM - 12PM" &&
                    selectedPackage.room == item.room
                      ? "default"
                      : data?.find(
                          (reservation: Reservations) =>
                            reservation.timeSlot == "10AM - 12PM" &&
                            item.room == reservation.room &&
                            reservation.paymentStatus
                        )
                      ? "destructive"
                      : "outline"
                  }
                  onClick={() => {
                    setSelectedPackage({
                      room: item.room,
                      time: "10AM - 12PM",
                      price: item.price,
                    });
                  }}
                  className={"flex-1"}
                >
                  10 AM - 12 PM
                </Button>
                <Button
                  disabled={
                    data?.find(
                      (reservation: Reservations) =>
                        reservation.timeSlot == "12PM - 2PM" &&
                        item.room == reservation.room &&
                        reservation.paymentStatus
                    ) || isLoading
                  }
                  variant={
                    selectedPackage.time == "12PM - 2PM" &&
                    selectedPackage.room == item.room
                      ? "default"
                      : data?.find(
                          (reservation: Reservations) =>
                            reservation.timeSlot == "12PM - 2PM" &&
                            item.room == reservation.room &&
                            reservation.paymentStatus
                        )
                      ? "destructive"
                      : "outline"
                  }
                  onClick={() => {
                    setSelectedPackage({
                      room: item.room,
                      time: "12PM - 2PM",
                      price: item.price,
                    });
                  }}
                  className={"flex-1"}
                >
                  12 PM - 2 PM
                </Button>
                <Button
                  disabled={
                    data?.find(
                      (reservation: Reservations) =>
                        reservation.timeSlot == "2PM - 4PM" &&
                        item.room == reservation.room &&
                        reservation.paymentStatus
                    ) || isLoading
                  }
                  variant={
                    selectedPackage.time == "2PM - 4PM" &&
                    selectedPackage.room == item.room
                      ? "default"
                      : data?.find(
                          (reservation: Reservations) =>
                            reservation.timeSlot == "2PM - 4PM" &&
                            item.room == reservation.room &&
                            reservation.paymentStatus
                        )
                      ? "destructive"
                      : "outline"
                  }
                  onClick={() => {
                    setSelectedPackage({
                      room: item.room,
                      time: "2PM - 4PM",
                      price: item.price,
                    });
                  }}
                  className={"flex-1 disabled:pointer-events-none"}
                >
                  2 PM - 4PM
                </Button>
                <Button
                  disabled={
                    data?.find(
                      (reservation: Reservations) =>
                        reservation.timeSlot == "4PM - 6PM" &&
                        item.room == reservation.room &&
                        reservation.paymentStatus
                    ) || isLoading
                  }
                  variant={
                    selectedPackage.time == "4PM - 6PM" &&
                    selectedPackage.room == item.room
                      ? "default"
                      : data?.find(
                          (reservation: Reservations) =>
                            reservation.timeSlot == "4PM - 6PM" &&
                            item.room == reservation.room &&
                            reservation.paymentStatus
                        )
                      ? "destructive"
                      : "outline"
                  }
                  onClick={() => {
                    setSelectedPackage({
                      room: item.room,
                      time: "4PM - 6PM",
                      price: item.price,
                    });
                  }}
                  className={"flex-1"}
                >
                  4 PM - 6 PM
                </Button>
                <Button
                  disabled={
                    data?.find(
                      (reservation: Reservations) =>
                        reservation.timeSlot == "6PM - 8PM" &&
                        item.room == reservation.room &&
                        reservation.paymentStatus
                    ) || isLoading
                  }
                  variant={
                    selectedPackage.time == "6PM - 8PM" &&
                    selectedPackage.room == item.room
                      ? "default"
                      : data?.find(
                          (reservation: Reservations) =>
                            reservation.timeSlot == "6PM - 8PM" &&
                            item.room == reservation.room &&
                            reservation.paymentStatus
                        )
                      ? "destructive"
                      : "outline"
                  }
                  onClick={() => {
                    setSelectedPackage({
                      room: item.room,
                      time: "6PM - 8PM",
                      price: item.price,
                    });
                  }}
                  className={"flex-1"}
                >
                  6 PM - 8PM
                </Button>
              </div>
              <div className={"flex items-center"}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"link"} className={"pb-5"}>
                      <h1>View more details</h1>
                      <FaAngleDown />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={"h-screen max-sm:w-screen md:h-[80vh]"}
                  >
                    <DialogHeader>
                      <DialogTitle>{item.room}</DialogTitle>
                      <DialogDescription>{item.id}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
        <div className={"flex gap-x-3 mb-10"}>
          <Button
            type={"submit"}
            className={"w-full"}
            variant={"outline"}
            onClick={() => {
              router.push("?step=1");
            }}
          >
            Back
          </Button>
          <Button
            type={"submit"}
            className={"w-full"}
            variant={"outline"}
            onClick={handleNextButton}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
