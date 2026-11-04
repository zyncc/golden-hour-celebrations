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
import { useReservation } from "@/context/ReservationStore";
import {
  ADDITIONAL_PERSON_PRICE,
  getTheatreOriginalPrice,
  getTheatrePrice,
  getTimeSlotsForDuration,
  SLOT_HOURS,
  THEATRES,
} from "@/lib/constants";
import formatCurrency from "@/lib/formatCurrency";
import {
  cn,
  FormatDate,
  getAvailableSlotsCount,
  getSlotInterval,
  isSlotUnavailable,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { Monitor, Sofa, Users, Utensils, Video, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function StepOne() {
  const { reservation, setReservationData } = useReservation();
  const router = useRouter();

  // Selected hour per theatre card on the page (default: 1 hour)
  const [selectedHours, setSelectedHours] = useState<Record<string, number>>({
    "Dreamscape Theatre": 1,
    "Elite Theatre": 1,
    "The Royal": 1,
  });

  // State for the slot selection dialog (opened via Proceed Slot)
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    room?: string;
    duration: number;
    selectedSlot?: string;
  }>({
    open: false,
    room: undefined,
    duration: 1,
    selectedSlot: undefined,
  });

  const [showEliteDetails, setShowEliteDetails] = useState(false);
  const [showDreamscapeDetails, setShowDreamscapeDetails] = useState(false);
  const [showRoyalDetails, setShowRoyalDetails] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let nextMonth = currentMonth + 1;
  let nextYear = currentDate.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }
  const nextMonthDate = new Date(nextYear, nextMonth, 1);

  const { data, isLoading } = useQuery({
    queryKey: ["getReservation", reservation?.date],
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    enabled: reservation?.date ? true : false,
    queryFn: async () => {
      const res = await fetch(`/api/fetchReservations?date=${reservation?.date}`);
      return res.json();
    },
  });

  function handleOpenSlotDialog(room: string) {
    if (!reservation?.date) {
      toast.error("Please select a date on the calendar first");
      return;
    }
    const currentDuration = selectedHours[room] ?? 1;
    setDialogState({
      open: true,
      room,
      duration: currentDuration,
      selectedSlot: undefined,
    });
  }

  function handleConfirmSlotAndProceed() {
    if (!dialogState.room || !dialogState.selectedSlot || !reservation?.date) {
      toast.error("Please select a time slot to continue");
      return;
    }

    try {
      const interval = getSlotInterval(reservation.date, dialogState.selectedSlot);
      const calculatedPrice = getTheatrePrice(
        dialogState.room,
        dialogState.duration,
        dialogState.selectedSlot,
      );

      setReservationData({
        ...reservation,
        room: dialogState.room,
        timeSlot: dialogState.selectedSlot,
        slotStartTime: interval.startDate.toISOString(),
        slotEndTime: interval.endDate.toISOString(),
        duration: dialogState.duration,
        price: calculatedPrice,
      });

      toast.success(dialogState.room, {
        description: `Time - ${dialogState.selectedSlot} (${dialogState.duration} hr)`,
        duration: 3000,
      });

      setDialogState((prev) => ({ ...prev, open: false }));

      router.push("?step=2", {
        scroll: true,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to select slot. Please try again.");
    }
  }

  const activeTheatre = THEATRES.find((t) => t.room === dialogState.room);
  const activeDialogPrice = dialogState.room
    ? getTheatrePrice(dialogState.room, dialogState.duration, dialogState.selectedSlot)
    : 0;
  const activeDialogOriginalPrice = dialogState.room
    ? getTheatreOriginalPrice(dialogState.room, dialogState.duration)
    : undefined;

  return (
    <div className={"mt-10 mb-24 w-full"}>
      <Calendar
        mode="single"
        className="mb-5 w-fit rounded-lg shadow-md"
        disabled={{ before: currentDate }}
        startMonth={currentDate}
        endMonth={nextMonthDate}
        selected={reservation?.date ? new Date(reservation.date) : undefined}
        onSelect={(date) => {
          if (!date) return;
          setReservationData({
            ...reservation,
            date: FormatDate(date),
            timeSlot: undefined,
            slotStartTime: undefined,
            slotEndTime: undefined,
            price: undefined,
          });
        }}
      />

      <div className="flex w-full">
        <div className="mx-auto w-full min-w-0">
          <div className="grid min-w-0 grid-cols-1 gap-6 pb-6 md:grid-cols-2">
            {THEATRES.map((pkg, index) => {
              const currentHour = selectedHours[pkg.room] ?? 1;
              const currentPrice = getTheatrePrice(pkg.room, currentHour);
              const originalPrice = getTheatreOriginalPrice(pkg.room, currentHour);
              const availableSlotsForHour = getAvailableSlotsCount(
                currentHour,
                pkg.room,
                data,
                reservation?.date,
              );

              return (
                <Card
                  key={index}
                  className="border-border/80 relative min-w-0 overflow-hidden rounded-2xl border p-0 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex flex-col">
                    <div className="relative">
                      <EmblaCarousel images={pkg.photo} />
                    </div>

                    <div className="flex flex-col p-4 sm:p-6">
                      <div className="mb-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h2 className="text-foreground text-2xl font-bold tracking-tight">
                            {pkg.room}
                          </h2>
                          {pkg.popular && (
                            <Badge
                              variant={"destructive"}
                              className="border-none font-medium whitespace-nowrap"
                            >
                              Most Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {pkg.specs?.map((spec, i) => (
                          <Badge key={i} variant={"outline"}>
                            {i === 0 && (
                              <Users className="text-muted-foreground h-3.5 w-3.5" />
                            )}
                            {i === 1 && (
                              <Video className="text-muted-foreground h-3.5 w-3.5" />
                            )}
                            {i === 2 && (
                              <Volume2 className="text-muted-foreground h-3.5 w-3.5" />
                            )}
                            {i === 3 && (
                              <Sofa className="text-muted-foreground h-3.5 w-3.5" />
                            )}
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      <Badge variant={"secondary"} className="mb-2">
                        <Utensils className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        <span>Add Cake, Decorations, Lights etc in next step</span>
                      </Badge>

                      <ul className="text-muted-foreground mb-5 grow space-y-2 text-sm">
                        <p className="text-foreground text-xs font-semibold tracking-wider uppercase">
                          Includes
                        </p>
                        {pkg.description.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <svg
                              className="text-destructive h-4 w-4 shrink-0"
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
                            <span>{feature}</span>
                          </li>
                        ))}

                        {pkg.room === "Dreamscape Theatre" ? (
                          <Dialog
                            open={showDreamscapeDetails}
                            onOpenChange={setShowDreamscapeDetails}
                          >
                            <DialogTrigger
                              render={
                                <Button
                                  variant="link"
                                  className="text-primary p-0 text-xs underline"
                                >
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
                                <div className="space-y-6 px-6 pb-6">
                                  <div className="bg-secondary rounded-lg p-4 text-center">
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                      <strong>
                                        🎬 Theatre Specifications for the Ultimate Movie
                                        and Celebration Experience
                                      </strong>
                                      <br />
                                      At Golden Hour Celebrations, we offer a luxurious,
                                      private theatre experience where every element is
                                      designed for comfort, connection, and celebration.
                                    </p>
                                  </div>
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
                                          </strong>
                                        </p>
                                        <p className="text-muted-foreground">
                                          A giant screen that brings movies to life in
                                          brilliant detail.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : pkg.room === "Elite Theatre" ? (
                          <Dialog
                            open={showEliteDetails}
                            onOpenChange={setShowEliteDetails}
                          >
                            <DialogTrigger
                              render={
                                <Button
                                  variant="link"
                                  className="text-primary p-0 text-xs underline"
                                >
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
                              <div className="max-h-[80vh] flex-1 overflow-y-auto px-6 pb-6">
                                <p className="text-muted-foreground text-sm">
                                  From high-end tech to soft, cinematic vibes — Elite
                                  Theatre gives you everything you need for a private
                                  theatre night that feels grand, yet personal.
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : pkg.room === "The Royal" ? (
                          <Dialog
                            open={showRoyalDetails}
                            onOpenChange={setShowRoyalDetails}
                          >
                            <DialogTrigger
                              render={
                                <Button
                                  variant="link"
                                  className="text-primary p-0 text-xs underline"
                                >
                                  More Details
                                </Button>
                              }
                            />
                            <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
                              <DialogHeader className="contents space-y-0 text-left">
                                <DialogTitle className="flex items-center gap-2 px-6 py-6">
                                  The Royal
                                </DialogTitle>
                              </DialogHeader>
                              <div className="max-h-[80vh] overflow-y-auto px-6 pb-6">
                                <p className="text-muted-foreground text-sm">
                                  Experience unparalleled luxury in The Royal. Perfect for
                                  large gatherings, our space comfortably accommodates up
                                  to 40 guests.
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : null}
                      </ul>

                      {/* Slot Hour Selector on card */}
                      <div className="mb-1">
                        <p className="text-foreground mb-2 text-sm font-semibold">
                          Select slot hour
                        </p>
                        {/* Title & Badge */}
                        <div className="flex w-full min-w-0 flex-col gap-1.5 sm:flex-row sm:gap-2">
                          {SLOT_HOURS.map((hr) => {
                            const count = getAvailableSlotsCount(
                              hr,
                              pkg.room,
                              data,
                              reservation?.date,
                            );
                            const isSelected = currentHour === hr;

                            return (
                              <Button
                                key={hr}
                                onClick={() => {
                                  setSelectedHours((prev) => ({
                                    ...prev,
                                    [pkg.room]: hr,
                                  }));
                                }}
                                className="flex-1 p-2"
                                variant={isSelected ? "default" : "outline"}
                              >
                                <span className="whitespace-nowrap">{hr} hour</span>
                                <span
                                  className={cn(
                                    "rounded-full px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap sm:text-xs",
                                    isSelected
                                      ? "bg-primary-foreground/20 text-primary-foreground"
                                      : "bg-muted text-muted-foreground",
                                  )}
                                >
                                  {reservation?.date ? `${count} slots` : "-"}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                        <div>
                          <span className="text-muted-foreground block text-xs">
                            Starting from
                          </span>
                          <div className="flex items-baseline gap-2">
                            {originalPrice && (
                              <span className="text-muted-foreground text-base font-medium line-through">
                                {formatCurrency(originalPrice)}
                              </span>
                            )}
                            <span className="text-foreground text-2xl font-extrabold sm:text-3xl">
                              {formatCurrency(currentPrice)}
                            </span>
                          </div>
                          <p className="text-muted-foreground mt-0.5 text-xs">
                            + ₹{ADDITIONAL_PERSON_PRICE}/person after {pkg.noPeople}{" "}
                            People
                          </p>
                        </div>
                        <Button
                          type="button"
                          onClick={() => handleOpenSlotDialog(pkg.room)}
                          className="cursor-pointer rounded-full border-none px-6 py-2.5 font-semibold transition-all"
                        >
                          Select Slot
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog
        open={dialogState.open}
        onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}
      >
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-3xl">
          <DialogHeader className="border-b p-4 pb-2 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-bold sm:text-2xl">
                  Select Time Slot
                </DialogTitle>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                  {dialogState.room}
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
            <div>
              <h3 className="text-foreground mb-3 text-sm font-bold">Slot Hour</h3>
              <div className="grid grid-cols-3 gap-2.5">
                {SLOT_HOURS.map((hr) => {
                  const count = dialogState.room
                    ? getAvailableSlotsCount(
                        hr,
                        dialogState.room,
                        data,
                        reservation?.date,
                      )
                    : 0;
                  const isSelected = dialogState.duration === hr;

                  return (
                    <Button
                      key={hr}
                      type="button"
                      onClick={() => {
                        setDialogState((prev) => ({
                          ...prev,
                          duration: hr,
                          selectedSlot: undefined,
                        }));
                      }}
                      variant={isSelected ? "default" : "outline"}
                      className="flex h-auto flex-col gap-1 px-1 py-1.5 text-xs sm:flex-row sm:gap-1.5 sm:px-3 sm:py-2 sm:text-sm"
                    >
                      <span className="whitespace-nowrap">{hr} hour</span>
                      <Badge
                        variant={"outline"}
                        className="px-1.5 py-0.5 text-[10px] sm:text-xs"
                      >
                        {count} slots
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground text-sm font-bold">Time slots</h3>
                {isLoading && (
                  <span className="text-muted-foreground text-xs">
                    Checking availability...
                  </span>
                )}
              </div>

              <div className="grid max-h-[40vh] grid-cols-2 gap-2.5 overflow-y-auto pr-1">
                {getTimeSlotsForDuration(dialogState.duration).map((slot) => {
                  const unavailable =
                    !reservation?.date ||
                    (dialogState.room
                      ? isSlotUnavailable(slot, dialogState.room, data, reservation.date)
                      : false);

                  const isSelected = dialogState.selectedSlot === slot;

                  if (unavailable) {
                    return (
                      <Button
                        key={slot}
                        disabled
                        className="cursor-not-allowed"
                        variant={"destructive"}
                      >
                        {slot}
                      </Button>
                    );
                  }
                  return (
                    <Button
                      key={slot}
                      onClick={() => {
                        setDialogState((prev) => ({
                          ...prev,
                          selectedSlot: slot,
                        }));
                      }}
                      variant={isSelected ? "default" : "outline"}
                    >
                      {slot}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-muted/10 flex items-center justify-between gap-4 border-t p-4 sm:p-5">
            <div className="text-xs sm:text-sm">
              {dialogState.selectedSlot ? (
                <p className="text-foreground font-medium">
                  Selected:{" "}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {dialogState.selectedSlot}
                  </span>{" "}
                  ({dialogState.duration} hr)
                </p>
              ) : (
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-2">
                    {activeDialogOriginalPrice && (
                      <span className="text-muted-foreground text-sm font-medium line-through">
                        {formatCurrency(activeDialogOriginalPrice)}
                      </span>
                    )}
                    <span className="text-foreground text-xl font-bold">
                      {formatCurrency(activeDialogPrice)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    + ₹{ADDITIONAL_PERSON_PRICE}/person after{" "}
                    {activeTheatre?.noPeople || 2} People
                  </p>
                </div>
              )}
            </div>

            <Button
              type="button"
              disabled={!dialogState.selectedSlot}
              onClick={handleConfirmSlotAndProceed}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmblaCarousel({ images }: { images: string[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({
      delay: 2000,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
    }),
  ]);

  return (
    <div className="embla bg-black">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((src, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={src}
                alt=""
                className="aspect-video h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
