"use client";

import { Button } from "@/components/ui/button";
import { useReservation } from "@/app/context/ReservationStore";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React from "react";

type Props = {
  id: number;
  theatre: string;
  noPeople: number;
  decoration: string;
  price: number;
  photo: string[];
}[];

export default function StepTwo({ items }: { items: Props }) {
  const { reservation } = useReservation();
  if (reservation == undefined) {
    redirect("/book");
  }
  const router = useRouter();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 3000 }),
  ]);
  return (
    <div className={"mt-10 w-full flex"}>
      <div className={"flex flex-col gap-y-5 w-full"}>
        <div
          className={
            "w-full grid gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {items.map((item, i) => (
            <div key={item.id} className="flex flex-col gap-y-3 md:col-span-1">
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
                          className="rounded-md object-cover aspect-video"
                          fetchPriority="high"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h1>{item.theatre}</h1>
              <h1>Upto {item.noPeople} people</h1>
              <h1>Decoration {item.decoration}</h1>
              <h1>₹{item.price}</h1>
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
            onClick={() => {
              router.push("?step=3");
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
