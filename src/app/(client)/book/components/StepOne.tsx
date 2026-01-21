"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useReservation } from "@/context/ReservationStore";
import { dreamscapeTimeSlots, EliteTimeSlots, items } from "@/lib/constants";
import formatCurrency from "@/lib/formatCurrency";
import { Reservations } from "@/prisma/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function StepOne() {
  const { reservation, setReservationData } = useReservation();
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
  const [showEliteDetails, setShowEliteDetails] = useState(false);
  const [showDreamscapeDetails, setShowDreamscapeDetails] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let nextMonth = currentMonth + 1;
  let nextYear = currentDate.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }
  const nextMonthDate = new Date(nextYear, nextMonth, 1);

  function handleNextButton() {
    if (selectedPackage.room == undefined || selectedPackage.time == undefined) {
      toast.error("Select a time slot to continue");
    } else {
      setReservationData({
        ...reservation,
        room: selectedPackage.room,
        timeSlot: selectedPackage.time,
        price: selectedPackage.price,
      });
      router.push("?step=2", {
        scroll: true,
      });
    }
  }

  useEffect(() => {
    setSelectedPackage({
      price: undefined,
      room: undefined,
      time: undefined,
    });
  }, [reservation?.date]);

  const { data, isLoading } = useQuery({
    queryKey: ["getReservation", reservation?.date],
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    enabled: reservation?.date ? true : false,
    queryFn: async () => {
      const res = await fetch(
        `/api/fetchReservations?date=${reservation?.date?.toISOString()}`,
      );
      return res.json();
    },
  });
  return (
    <div className={"mt-10 mb-24 w-full"}>
      <Calendar
        mode="single"
        className="mb-5 w-fit rounded-lg shadow-md"
        disabled={{ before: currentDate }}
        startMonth={currentDate}
        endMonth={nextMonthDate}
        selected={reservation?.date}
        onSelect={(date) => {
          setReservationData({
            ...reservation,
            date,
          });
        }}
      />
      <div className="flex w-full">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 gap-5 pb-6 md:grid-cols-2">
            {items.map((pkg, index) => (
              <Card key={index} className="relative overflow-hidden rounded-xl">
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
                            className="object-cover"
                            placeholder="blur"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="flex flex-col p-3 md:p-6">
                    <div className="mb-6 space-y-4">
                      <div className="flex justify-between">
                        <h2 className="w-full text-2xl font-bold">{pkg.room}</h2>
                        {pkg.popular && (
                          <Badge
                            variant={"destructive"}
                            className="border-none font-medium text-nowrap whitespace-nowrap"
                          >
                            Most Popular
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>
                    </div>
                    <ul className="mb-6 grow space-y-3">
                      <p>Includes</p>
                      {pkg.description.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <svg
                            className="text-destructive mr-2 h-5 w-5 shrink-0"
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
                          <DialogTrigger
                            render={
                              <Button variant="link" className="p-0 underline">
                                More Details
                              </Button>
                            }
                          />
                          <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
                            <DialogHeader className="contents space-y-0 text-left">
                              <DialogTitle className="flex items-center gap-2 px-6 py-6">
                                Dreamscape Theatre
                              </DialogTitle>
                            </DialogHeader>
                            <div className="max-h-[80vh] flex-1 overflow-y-auto">
                              <div className="px-6 pb-6">
                                <div className="space-y-6">
                                  {/* Introduction */}
                                  <div className="bg-secondary rounded-lg p-4 text-center">
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                      <strong>
                                        🎬 Theatre Specifications for the Ultimate Movie
                                        and celebration Experience
                                      </strong>
                                      <br />
                                      At Golden Hour Celebrations, we offer a luxurious,
                                      private theatre experience where every element —
                                      from sound to seating — is designed for comfort,
                                      connection, and celebration.
                                    </p>
                                  </div>

                                  {/* Visual Experience */}
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Monitor className="h-5 w-5 text-blue-600" />
                                      <h3 className="text-lg font-semibold">
                                        📽️ Visual Experience
                                      </h3>
                                    </div>
                                    <div className="space-y-2 pl-7 text-sm">
                                      <div className="rounded-md p-3">
                                        <p>
                                          <strong>
                                            120-Inch Fixed Frame Projector Screen
                                          </strong>{" "}
                                          (16:9, Diagonal Active 3D, 4K Ready)
                                        </p>
                                        <p className="text-muted-foreground">
                                          A giant screen that brings movies to life in
                                          brilliant detail.
                                        </p>
                                      </div>
                                      <div className="rounded-md p-3">
                                        <p>
                                          <strong>
                                            Epson EH-TW750 Full HD Home Cinema Projector
                                          </strong>
                                        </p>
                                        <p className="text-muted-foreground">
                                          Crisp visuals even in bright spaces — perfect
                                          for both movie marathons and intimate moments.
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <Separator />

                                  {/* Audio Experience */}
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Volume2 className="h-5 w-5 text-green-600" />
                                      <h3 className="text-lg font-semibold">
                                        🔊 Immersive Sound
                                      </h3>
                                    </div>
                                    <div className="space-y-2 pl-7 text-sm">
                                      <div className="rounded-md p-3">
                                        <p>
                                          <strong>
                                            ZEBRONICS PRO Dolby 5.1 Soundbar System
                                          </strong>
                                        </p>
                                        <ul className="text-muted-foreground mt-1 space-y-1">
                                          <li>
                                            • Surround sound with 525 Watts output for a
                                            theatre-like audio experience
                                          </li>
                                          <li>
                                            • Wireless satellites & deep subwoofer for
                                            immersive sound
                                          </li>
                                          <li>
                                            • Multiple connectivity options — HDMI ARC,
                                            Optical, Bluetooth v5.0, AUX
                                          </li>
                                          <li>
                                            • Sleek LED display and wall-mount setup
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <Separator />

                                  {/* Comfort */}
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Sofa className="h-5 w-5 text-orange-600" />
                                      <h3 className="text-lg font-semibold">
                                        🛋️ Comfort & Ambience
                                      </h3>
                                    </div>
                                    <div className="space-y-2 pl-7 text-sm">
                                      <div className="grid gap-2">
                                        <div className="flex items-start gap-2">
                                          <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                                          <div>
                                            <p>
                                              <strong>Recliner Sofas:</strong> Cozy,
                                              spacious, and luxurious — perfect for
                                              curling up with your partner.
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Speaker className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                                          <div>
                                            <p>
                                              <strong>Acoustically Treated Walls:</strong>{" "}
                                              Crystal-clear audio with no distractions, so
                                              every whisper and laugh feels personal.
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Snowflake className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                          <div>
                                            <p>
                                              <strong>Air-Conditioned Comfort:</strong>{" "}
                                              Fully AC theatre that keeps the space cool,
                                              fresh, and pleasant.
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
                                      <Heart className="h-5 w-5 text-pink-600" />
                                      <h3 className="text-lg font-semibold">
                                        💑 For Couples: Celebrate Love in Your Own Private
                                        Theatre
                                      </h3>
                                    </div>
                                    <div className="pl-7 text-sm">
                                      <p className="text-muted-foreground mb-3">
                                        Whether it&apos;s a birthday surprise, anniversary
                                        date, proposal, or just quality time away from the
                                        world — our couple theatre is crafted for
                                        closeness and connection.
                                      </p>
                                      <div className="grid gap-2">
                                        <div className="flex items-start gap-2">
                                          <Heart className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                                          <div>
                                            <p>
                                              <strong>Private, Cozy Atmosphere:</strong>{" "}
                                              Just the two of you, with no interruptions.
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                                          <div>
                                            <p>
                                              <strong>Custom Decor Options:</strong>{" "}
                                              Romantic setups with fairy lights, balloons,
                                              rose petals, and more — tailored for your
                                              moment.
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Film className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                          <div>
                                            <p>
                                              <strong>
                                                Personalised Playlist & Movie Choice:
                                              </strong>{" "}
                                              Watch your favorite film or a special video
                                              that means something to you both.
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Star className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                                          <div>
                                            <p>
                                              <strong>Add-Ons Available:</strong> Cakes,
                                              messages on screen, gifts, curated themes —
                                              we help you plan every detail.
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Heart className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                                          <div>
                                            <p>
                                              <strong>Memory-Making Space:</strong> The
                                              perfect setting to relax, reconnect, and
                                              create beautiful moments — all in complete
                                              privacy.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-secondary rounded-lg p-3 text-center">
                                    <p className="text-sm font-medium">
                                      Create unforgettable moments in your own private
                                      cinema, designed for love and connection.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Dialog
                          open={showEliteDetails}
                          onOpenChange={setShowEliteDetails}
                        >
                          <DialogTrigger
                            render={
                              <Button variant="link" className="p-0 underline">
                                More Details
                              </Button>
                            }
                          />
                          <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
                            <DialogHeader className="contents space-y-0 text-left">
                              <DialogTitle className="flex items-center gap-2 px-6 py-6">
                                Elite Theatre
                              </DialogTitle>
                            </DialogHeader>

                            <div className="max-h-[80vh] overflow-y-auto px-6 pb-6">
                              <div className="space-y-6">
                                {/* Introduction */}
                                <div className="bg-secondary rounded-lg border p-4 text-center">
                                  <p className="text-muted-foreground text-sm leading-relaxed">
                                    Step into our <strong>Elite Theatre</strong>, designed
                                    for unforgettable group celebrations and immersive
                                    cinematic experiences. Whether it&apos;s a birthday,
                                    bachelorette, anniversary, or a chill movie night —
                                    this space offers the perfect blend of
                                    high-performance technology and luxurious comfort.
                                  </p>
                                </div>

                                {/* Visual Experience */}
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Monitor className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold">
                                      📽️ Stunning Visuals
                                    </h3>
                                  </div>
                                  <div className="space-y-2 pl-7 text-sm">
                                    <div className="rounded-md p-3">
                                      <p>
                                        <strong>
                                          120-Inch Fixed Frame Projector Screen
                                        </strong>{" "}
                                        (16:9, Diagonal Active 3D, 4K Ready)
                                      </p>
                                      <p className="text-muted-foreground">
                                        Large-format viewing with sharp, vibrant,
                                        cinema-like visuals.
                                      </p>
                                    </div>
                                    <div className="rounded-md p-3">
                                      <p>
                                        <strong>
                                          Epson EH-TW750 Full HD Cinema Projector
                                        </strong>
                                      </p>
                                      <p className="text-muted-foreground">
                                        Bright, crisp picture quality — perfect for both
                                        daytime and nighttime screenings.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                {/* Audio Experience */}
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Volume2 className="h-5 w-5 text-green-600" />
                                    <h3 className="text-lg font-semibold">
                                      🔊 Premium Surround Sound
                                    </h3>
                                  </div>
                                  <div className="space-y-2 pl-7 text-sm">
                                    <div className="rounded-md p-3">
                                      <p>
                                        <strong>
                                          Denon AVR-X250BT 5.1 Ch. 4K Ultra HD AV Receiver
                                          with Bluetooth
                                        </strong>
                                      </p>
                                      <ul className="text-muted-foreground mt-1 space-y-1">
                                        <li>
                                          • Delivers dynamic, immersive surround sound
                                          with support for 4K Ultra HD
                                        </li>
                                        <li>
                                          • Bluetooth-enabled for seamless wireless audio
                                          playback
                                        </li>
                                        <li>
                                          • Optimized for detailed, room-filling sound
                                          with rich cinematic quality
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="rounded-md p-3">
                                      <p>
                                        <strong>Yamaha NS-P41 5.1 Speaker System</strong>
                                      </p>
                                      <ul className="text-muted-foreground mt-1 space-y-1">
                                        <li>
                                          • <strong>Powerful, Balanced Sound:</strong>{" "}
                                          Engineered to deliver clean, natural audio
                                          across all frequencies
                                        </li>
                                        <li>
                                          • <strong>Advanced YST II Subwoofer:</strong>{" "}
                                          Features Yamaha&apos;s proprietary Advanced YST
                                          II technology for deep, tight bass with low
                                          distortion
                                        </li>
                                        <li>
                                          •{" "}
                                          <strong>
                                            Wall-Mountable Satellite Speakers:
                                          </strong>{" "}
                                          Flexible placement options for optimal surround
                                          effect
                                        </li>
                                        <li>
                                          • Perfect Match with Denon AVR: Offers a
                                          complete and cohesive theatre-grade audio
                                          experience with crystal-clear dialogue and
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
                                    <Sofa className="h-5 w-5 text-orange-600" />
                                    <h3 className="text-lg font-semibold">
                                      🛋️ Theatre-Style Comfort
                                    </h3>
                                  </div>
                                  <div className="space-y-2 pl-7 text-sm">
                                    <div className="grid gap-2">
                                      <div className="flex items-start gap-2">
                                        <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                                        <div>
                                          <p>
                                            <strong>Recliner Sofas:</strong> Plush and
                                            spacious, ideal for laid-back celebrations or
                                            binge-worthy movie sessions.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <Speaker className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                                        <div>
                                          <p>
                                            <strong>Acoustically Treated Walls:</strong>{" "}
                                            Professional soundproofing for an immersive,
                                            echo-free experience.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <Snowflake className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                        <div>
                                          <p>
                                            <strong>Air-Conditioned Ambience:</strong>{" "}
                                            Stay cool and comfortable in a fully AC
                                            environment, no matter the season.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                {/* Add-ons */}
                                <div className="bg-secondary rounded-lg p-4">
                                  <p className="text-sm">
                                    <strong>🎉 Optional add-ons available:</strong>{" "}
                                    Customized décor, screen messages, cakes, photo
                                    corners, and curated playlists — tailored to your
                                    celebration.
                                  </p>
                                </div>

                                <div className="bg-secondary rounded-lg p-3 text-center">
                                  <p className="text-sm font-medium">
                                    From high-end tech to soft, cinematic vibes — Elite
                                    Theatre gives you everything you need for a private
                                    theatre night that feels grand, yet personal.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </ul>
                    <div className="grid w-full grid-cols-2 gap-2">
                      {pkg.room == "Dreamscape Theatre"
                        ? dreamscapeTimeSlots.map((slot) => (
                            <Button
                              key={slot}
                              disabled={
                                reservation?.noOfPeople! > 5 ||
                                data?.find(
                                  (reservation: Reservations) =>
                                    reservation.timeSlot == slot &&
                                    pkg.room == reservation.room &&
                                    reservation.paymentStatus,
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
                                          reservation.paymentStatus,
                                      )
                                    ? "destructive"
                                    : "outline"
                              }
                              onClick={() => {
                                if (!reservation?.date) {
                                  toast.error("Please select a date");
                                  return;
                                }
                                toast.success(pkg.room, {
                                  description: `Time - ${slot}`,
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
                        : EliteTimeSlots.map((slot) => (
                            <Button
                              key={slot}
                              disabled={
                                data?.find(
                                  (reservation: Reservations) =>
                                    reservation.timeSlot == slot &&
                                    pkg.room == reservation.room &&
                                    reservation.paymentStatus,
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
                                          reservation.paymentStatus,
                                      )
                                    ? "destructive"
                                    : "outline"
                              }
                              onClick={() => {
                                if (!reservation?.date) {
                                  toast.error("Please select a date");
                                  return;
                                }
                                toast.success(pkg.room, {
                                  description: `Time - ${slot}`,
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
                    <p className="text-muted-foreground mt-5 text-sm">
                      Note: If requirement is more than 2 hours please contact us.
                    </p>
                    {pkg.room == "Dreamscape Theatre" && reservation?.noOfPeople! > 5 && (
                      <h1 className="text-destructive mt-4 font-medium">
                        Only upto 5 People are allowed
                      </h1>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="sticky bottom-6 z-10">
            <div className="bg-background rounded-2xl p-4 shadow-lg">
              <div className="mx-auto flex max-w-md gap-4">
                <Button
                  type={"submit"}
                  className={"flex-1 font-medium"}
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
    </div>
  );
}
