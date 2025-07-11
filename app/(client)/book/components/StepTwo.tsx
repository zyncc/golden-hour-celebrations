"use client";

import { Button } from "@/components/ui/button";
import { useReservation } from "@/context/ReservationStore";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Reservations } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import formatCurrency from "@/lib/formatCurrency";
import { dreamscapeTimeSlots, items, majesticTimeSlots } from "@/lib/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import {
  ArrowRight,
  Film,
  Heart,
  Monitor,
  Snowflake,
  Sofa,
  Speaker,
  Star,
  Volume2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
  const [showMajesticDetails, setShowMajesticDetails] = useState(false);
  const [showDreamscapeDetails, setShowDreamscapeDetails] = useState(false);

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
    <div className={"mt-10 mb-24 w-full"}>
      <div className="flex w-full">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 pb-6 gap-5">
            {items.map((pkg, index) => (
              <Card
                key={index}
                className="relative overflow-hidden rounded-xl  border-zinc-800"
              >
                <div className="flex flex-col">
                  <div className="relative h-96 overflow-hidden">
                    <Swiper
                      autoplay={{
                        delay: 2500,
                        pauseOnMouseEnter: true,
                      }}
                      effect={"fade"}
                      loop
                      modules={[Autoplay, EffectFade]}
                      spaceBetween={0}
                      slidesPerView={1}
                    >
                      {pkg.photo.map((pic, i) => (
                        <SwiperSlide key={i}>
                          <Image
                            src={pic}
                            alt={`${pkg.room} celebration scene`}
                            layout="fill"
                            objectFit="cover"
                            className="object-cover"
                            placeholder="blur"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="p-3 md:p-6 flex flex-col">
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-bold w-full text-white">
                          {pkg.room}{" "}
                          <span className="text-xs">
                            {pkg.room == "Dreamscape Theatre"
                              ? "(Max. 4 People)"
                              : "(Max. 15 People)"}
                          </span>
                        </h2>
                        {pkg.popular && (
                          <Badge className="bg-rose-500/90 text-nowrap hover:bg-rose-500 text-white border-none font-medium whitespace-nowrap">
                            Most Popular
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-white">
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6 flex-grow">
                      <p className="text-muted-foreground">Includes</p>
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
                      {pkg.room == "Dreamscape Theatre" ? (
                        <Dialog
                          open={showDreamscapeDetails}
                          onOpenChange={setShowDreamscapeDetails}
                        >
                          <DialogTrigger asChild>
                            <Button variant="link" className="p-0">
                              More Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
                            <ScrollArea className="flex max-h-full flex-col overflow-hidden">
                              <DialogHeader className="contents space-y-0 text-left"></DialogHeader>
                              <DialogTitle className="px-6 pt-6 flex items-center gap-2">
                                Dreamscape Theatre
                              </DialogTitle>
                              <div className="flex-1 overflow-y-auto">
                                <div className="p-6">
                                  <div className="space-y-6">
                                    {/* Introduction */}
                                    <div className="text-center p-4 bg-secondary rounded-lg">
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                        <strong>
                                          🎬 Theatre Specifications for the
                                          Ultimate Movie and celebration
                                          Experience
                                        </strong>
                                        <br />
                                        At Golden Hour Celebrations, we offer a
                                        luxurious, private theatre experience
                                        where every element — from sound to
                                        seating — is designed for comfort,
                                        connection, and celebration.
                                      </p>
                                    </div>

                                    {/* Visual Experience */}
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Monitor className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-semibold text-lg">
                                          📽️ Visual Experience
                                        </h3>
                                      </div>
                                      <div className="pl-7 space-y-2 text-sm">
                                        <div className="p-3 rounded-md">
                                          <p>
                                            <strong>
                                              120-Inch Fixed Frame Projector
                                              Screen
                                            </strong>{" "}
                                            (16:9, Diagonal Active 3D, 4K Ready)
                                          </p>
                                          <p className="text-muted-foreground">
                                            A giant screen that brings movies to
                                            life in brilliant detail.
                                          </p>
                                        </div>
                                        <div className="p-3 rounded-md">
                                          <p>
                                            <strong>
                                              Epson EH-TW750 Full HD Home Cinema
                                              Projector
                                            </strong>
                                          </p>
                                          <p className="text-muted-foreground">
                                            Crisp visuals even in bright spaces
                                            — perfect for both movie marathons
                                            and intimate moments.
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Audio Experience */}
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Volume2 className="w-5 h-5 text-green-600" />
                                        <h3 className="font-semibold text-lg">
                                          🔊 Immersive Sound
                                        </h3>
                                      </div>
                                      <div className="pl-7 space-y-2 text-sm">
                                        <div className="p-3  rounded-md">
                                          <p>
                                            <strong>
                                              ZEBRONICS PRO Dolby 5.1 Soundbar
                                              System
                                            </strong>
                                          </p>
                                          <ul className="text-muted-foreground mt-1 space-y-1">
                                            <li>
                                              • Surround sound with 525 Watts
                                              output for a theatre-like audio
                                              experience
                                            </li>
                                            <li>
                                              • Wireless satellites & deep
                                              subwoofer for immersive sound
                                            </li>
                                            <li>
                                              • Multiple connectivity options —
                                              HDMI ARC, Optical, Bluetooth v5.0,
                                              AUX
                                            </li>
                                            <li>
                                              • Sleek LED display and wall-mount
                                              setup
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Comfort */}
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Sofa className="w-5 h-5 text-orange-600" />
                                        <h3 className="font-semibold text-lg">
                                          🛋️ Comfort & Ambience
                                        </h3>
                                      </div>
                                      <div className="pl-7 space-y-2 text-sm">
                                        <div className="grid gap-2">
                                          <div className="flex items-start gap-2">
                                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p>
                                                <strong>Recliner Sofas:</strong>{" "}
                                                Cozy, spacious, and luxurious —
                                                perfect for curling up with your
                                                partner.
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-2">
                                            <Speaker className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p>
                                                <strong>
                                                  Acoustically Treated Walls:
                                                </strong>{" "}
                                                Crystal-clear audio with no
                                                distractions, so every whisper
                                                and laugh feels personal.
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-2">
                                            <Snowflake className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p>
                                                <strong>
                                                  Air-Conditioned Comfort:
                                                </strong>{" "}
                                                Fully AC theatre that keeps the
                                                space cool, fresh, and pleasant.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Couples Section */}
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-pink-600" />
                                        <h3 className="font-semibold text-lg">
                                          💑 For Couples: Celebrate Love in Your
                                          Own Private Theatre
                                        </h3>
                                      </div>
                                      <div className="pl-7 text-sm">
                                        <p className="mb-3 text-muted-foreground">
                                          Whether it&apos;s a birthday surprise,
                                          anniversary date, proposal, or just
                                          quality time away from the world — our
                                          couple theatre is crafted for
                                          closeness and connection.
                                        </p>
                                        <div className="grid gap-2">
                                          <div className="flex items-start gap-2">
                                            <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p>
                                                <strong>
                                                  Private, Cozy Atmosphere:
                                                </strong>{" "}
                                                Just the two of you, with no
                                                interruptions.
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-2">
                                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p>
                                                <strong>
                                                  Custom Decor Options:
                                                </strong>{" "}
                                                Romantic setups with fairy
                                                lights, balloons, rose petals,
                                                and more — tailored for your
                                                moment.
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-2">
                                            <Film className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p>
                                                <strong>
                                                  Personalised Playlist & Movie
                                                  Choice:
                                                </strong>{" "}
                                                Watch your favorite film or a
                                                special video that means
                                                something to you both.
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-2">
                                            <Star className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p>
                                                <strong>
                                                  Add-Ons Available:
                                                </strong>{" "}
                                                Cakes, messages on screen,
                                                gifts, curated themes — we help
                                                you plan every detail.
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-2">
                                            <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p>
                                                <strong>
                                                  Memory-Making Space:
                                                </strong>{" "}
                                                The perfect setting to relax,
                                                reconnect, and create beautiful
                                                moments — all in complete
                                                privacy.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="text-center p-3 bg-secondary rounded-lg">
                                      <p className="text-sm font-medium">
                                        Create unforgettable moments in your own
                                        private cinema, designed for love and
                                        connection.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Dialog
                          open={showMajesticDetails}
                          onOpenChange={setShowMajesticDetails}
                        >
                          <DialogTrigger asChild>
                            <Button variant="link" className="p-0">
                              More Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
                            <ScrollArea className="flex max-h-full flex-col overflow-hidden">
                              <DialogHeader className="contents space-y-0 text-left">
                                <DialogTitle className="px-6 pt-6 flex items-center gap-2">
                                  Majestic Theatre
                                </DialogTitle>
                                <DialogDescription asChild>
                                  <div className="p-6">
                                    <div className="space-y-6">
                                      {/* Introduction */}
                                      <div className="text-center bg-secondary p-4 rounded-lg border">
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                          Step into our{" "}
                                          <strong>Majestic Theatre</strong>,
                                          designed for unforgettable group
                                          celebrations and immersive cinematic
                                          experiences. Whether it&apos;s a
                                          birthday, bachelorette, anniversary,
                                          or a chill movie night — this space
                                          offers the perfect blend of
                                          high-performance technology and
                                          luxurious comfort.
                                        </p>
                                      </div>

                                      {/* Visual Experience */}
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <Monitor className="w-5 h-5 text-blue-600" />
                                          <h3 className="font-semibold text-lg">
                                            📽️ Stunning Visuals
                                          </h3>
                                        </div>
                                        <div className="pl-7 space-y-2 text-sm">
                                          <div className="p-3 rounded-md">
                                            <p>
                                              <strong>
                                                120-Inch Fixed Frame Projector
                                                Screen
                                              </strong>{" "}
                                              (16:9, Diagonal Active 3D, 4K
                                              Ready)
                                            </p>
                                            <p className="text-muted-foreground">
                                              Large-format viewing with sharp,
                                              vibrant, cinema-like visuals.
                                            </p>
                                          </div>
                                          <div className="p-3 rounded-md">
                                            <p>
                                              <strong>
                                                Epson EH-TW750 Full HD Cinema
                                                Projector
                                              </strong>
                                            </p>
                                            <p className="text-muted-foreground">
                                              Bright, crisp picture quality —
                                              perfect for both daytime and
                                              nighttime screenings.
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Audio Experience */}
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <Volume2 className="w-5 h-5 text-green-600" />
                                          <h3 className="font-semibold text-lg">
                                            🔊 Premium Surround Sound
                                          </h3>
                                        </div>
                                        <div className="pl-7 space-y-2 text-sm">
                                          <div className="p-3 rounded-md">
                                            <p>
                                              <strong>
                                                Denon AVR-X250BT 5.1 Ch. 4K
                                                Ultra HD AV Receiver with
                                                Bluetooth
                                              </strong>
                                            </p>
                                            <ul className="text-muted-foreground mt-1 space-y-1">
                                              <li>
                                                • Delivers dynamic, immersive
                                                surround sound with support for
                                                4K Ultra HD
                                              </li>
                                              <li>
                                                • Bluetooth-enabled for seamless
                                                wireless audio playback
                                              </li>
                                              <li>
                                                • Optimized for detailed,
                                                room-filling sound with rich
                                                cinematic quality
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="p-3 rounded-md">
                                            <p>
                                              <strong>
                                                Yamaha NS-P41 5.1 Speaker System
                                              </strong>
                                            </p>
                                            <ul className="text-muted-foreground mt-1 space-y-1">
                                              <li>
                                                •{" "}
                                                <strong>
                                                  Powerful, Balanced Sound:
                                                </strong>{" "}
                                                Engineered to deliver clean,
                                                natural audio across all
                                                frequencies
                                              </li>
                                              <li>
                                                •{" "}
                                                <strong>
                                                  Advanced YST II Subwoofer:
                                                </strong>{" "}
                                                Features Yamaha&apos;s
                                                proprietary Advanced YST II
                                                technology for deep, tight bass
                                                with low distortion
                                              </li>
                                              <li>
                                                •{" "}
                                                <strong>
                                                  Wall-Mountable Satellite
                                                  Speakers:
                                                </strong>{" "}
                                                Flexible placement options for
                                                optimal surround effect
                                              </li>
                                              <li>
                                                • Perfect Match with Denon AVR:
                                                Offers a complete and cohesive
                                                theatre-grade audio experience
                                                with crystal-clear dialogue and
                                                dramatic soundscapes
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Comfort */}
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <Sofa className="w-5 h-5 text-orange-600" />
                                          <h3 className="font-semibold text-lg">
                                            🛋️ Theatre-Style Comfort
                                          </h3>
                                        </div>
                                        <div className="pl-7 space-y-2 text-sm">
                                          <div className="grid gap-2">
                                            <div className="flex items-start gap-2">
                                              <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p>
                                                  <strong>
                                                    Recliner Sofas:
                                                  </strong>{" "}
                                                  Plush and spacious, ideal for
                                                  laid-back celebrations or
                                                  binge-worthy movie sessions.
                                                </p>
                                              </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                              <Speaker className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p>
                                                  <strong>
                                                    Acoustically Treated Walls:
                                                  </strong>{" "}
                                                  Professional soundproofing for
                                                  an immersive, echo-free
                                                  experience.
                                                </p>
                                              </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                              <Snowflake className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p>
                                                  <strong>
                                                    Air-Conditioned Ambience:
                                                  </strong>{" "}
                                                  Stay cool and comfortable in a
                                                  fully AC environment, no
                                                  matter the season.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Add-ons */}
                                      <div className="p-4 bg-secondary rounded-lg">
                                        <p className="text-sm">
                                          <strong>
                                            🎉 Optional add-ons available:
                                          </strong>{" "}
                                          Customized décor, screen messages,
                                          cakes, photo corners, and curated
                                          playlists — tailored to your
                                          celebration.
                                        </p>
                                      </div>

                                      <div className="text-center p-3 bg-secondary rounded-lg">
                                        <p className="text-sm font-medium">
                                          From high-end tech to soft, cinematic
                                          vibes — Majestic Theatre gives you
                                          everything you need for a private
                                          theatre night that feels grand, yet
                                          personal.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      )}
                    </ul>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {pkg.room == "Dreamscape Theatre"
                        ? dreamscapeTimeSlots.map((slot) => (
                            <Button
                              key={slot}
                              disabled={
                                reservation.noOfPeople! > 5 ||
                                data?.find(
                                  (reservation: Reservations) =>
                                    reservation.timeSlot == slot &&
                                    pkg.room == reservation.room &&
                                    reservation.paymentStatus
                                ) ||
                                isLoading
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
                                  title: `${pkg.room}`,
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
                              {slot}
                            </Button>
                          ))
                        : majesticTimeSlots.map((slot) => (
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
                                  title: `${pkg.room}`,
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
                              {slot}
                            </Button>
                          ))}
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">
                      Note: If requirement is more than 2 hours please contact
                      us.
                    </p>
                    {pkg.room == "Dreamscape Theatre" &&
                      reservation.noOfPeople! > 5 && (
                        <h1 className="text-red-800 font-medium mt-4">
                          Only upto 5 People are allowed
                        </h1>
                      )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="sticky bottom-0 bg-background pt-4 pb-4 z-10">
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
                className={"flex-1 bg-highlight hover:bg-highlight-foreground"}
                variant={"default"}
                onClick={handleNextButton}
              >
                Select Addons <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
