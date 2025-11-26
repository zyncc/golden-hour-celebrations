"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ManualBookingSchema } from "@/lib/zodSchemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Reservations } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formatCurrency from "@/lib/formatCurrency";
import { CreateManualBooking } from "@/actions/createReservation";
import {
  cakePrice,
  cakes,
  candleLightRosePath,
  dreamscapeTimeSlots,
  ledLetterLightAge,
  ledLetterLightName,
  majesticTimeSlots,
} from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function CreateBookingForm() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let nextMonth = currentMonth + 1;
  let nextYear = currentDate.getFullYear();

  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }

  const nextMonthDate = new Date(nextYear, nextMonth, 1);

  // Local state
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [noOfPeople, setNoOfPeople] = useState<number>(0);
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [selectedCake, setSelectedCake] = useState<string>("");
  const [photography, setPhotography] = useState<string>("");
  const [fogEntry, setFogEntry] = useState(false);
  const [rosePath, setRosePath] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [wantsLedName, setWantsLedName] = useState(false);
  const [wantsLedAge, setWantsLedAge] = useState(false);

  const form = useForm<z.infer<typeof ManualBookingSchema>>({
    resolver: zodResolver(ManualBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      date: undefined,
      timeSlot: undefined,
      phone: "",
      occasion: undefined,
      room: undefined,
      cake: undefined,
      writingOnCake: undefined,
      photography: undefined,
      ledLetterAge: undefined,
      notes: undefined,
      ledLetterName: undefined,
      nameToDisplay: "",
      fogEntry: false,
      rosePath: false,
      balanceAmount: undefined,
      discount: 0,
      advanceAmount: undefined,
      noOfPeople: undefined,
    },
  });

  const date = selectedDate?.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getReservation", date],
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    enabled: !!selectedDate,
    queryFn: async () => {
      if (!selectedDate) return [];
      const res = await fetch(`/api/fetchReservations?date=${date}`);
      return res.json();
    },
  });

  const calculatedAmounts = useMemo(() => {
    let basePrice = 0;
    let extraPeopleCharge = 0;
    let cakeCost = 0;
    let photographyCost = 0;
    let fogEntryCost = 0;
    let rosePathCost = 0;
    let ledLetterCost = 0;
    let midnightCharge = 0;

    // Base room price
    if (selectedRoom === "Dreamscape Theatre") {
      basePrice = 1499;
    } else if (selectedRoom === "Majestic Theatre") {
      basePrice = 1899;
    }

    // Extra people charges
    if (selectedRoom === "Dreamscape Theatre" && noOfPeople > 2) {
      extraPeopleCharge = (noOfPeople - 2) * 200;
    } else if (selectedRoom === "Majestic Theatre" && noOfPeople > 4) {
      extraPeopleCharge = (noOfPeople - 4) * 200;
    }

    // Cake cost (separate from base price)
    if (selectedCake) {
      if (selectedCake === "Red velvet" || selectedCake === "Rasmalai") {
        cakeCost = 620;
      } else {
        cakeCost = cakePrice;
      }
    }

    // Photography cost (separate from base price)
    if (photography === "photoshoot") {
      photographyCost = 700;
    } else if (photography === "video") {
      photographyCost = 1500;
    }

    // Add-on costs (separate from base price)
    if (fogEntry) fogEntryCost = 400;
    if (rosePath) rosePathCost = candleLightRosePath;

    // LED letter costs (separate from base price)
    if (wantsLedName) ledLetterCost += ledLetterLightName;
    if (wantsLedAge) ledLetterCost += ledLetterLightAge;

    // Midnight charges
    if (
      selectedTimeSlot === "10PM - 12AM" ||
      selectedTimeSlot === "10:30PM - 12:30AM"
    ) {
      midnightCharge = 500;
    }

    const totalCost =
      basePrice +
      extraPeopleCharge +
      cakeCost +
      photographyCost +
      fogEntryCost +
      rosePathCost +
      ledLetterCost +
      midnightCharge;
    const balanceAmount = totalCost - advanceAmount - discount;

    return {
      basePrice,
      extraPeopleCharge,
      cakeCost,
      photographyCost,
      fogEntryCost,
      rosePathCost,
      ledLetterCost,
      midnightCharge,
      totalCost,
      balanceAmount: Math.max(0, balanceAmount),
    };
  }, [
    selectedRoom,
    noOfPeople,
    selectedCake,
    fogEntry,
    rosePath,
    photography,
    selectedTimeSlot,
    wantsLedName,
    wantsLedAge,
    advanceAmount,
    discount,
  ]);

  // Update form when calculated balance changes
  useEffect(() => {
    form.setValue("balanceAmount", calculatedAmounts.balanceAmount);
  }, [calculatedAmounts.balanceAmount, form]);

  // Reset time slot when room or date changes
  useEffect(() => {
    form.resetField("timeSlot");
  }, [selectedRoom, selectedDate, form]);

  // Get available time slots based on selected room
  const availableTimeSlots = useMemo(() => {
    return selectedRoom === "Dreamscape Theatre"
      ? dreamscapeTimeSlots
      : majesticTimeSlots;
  }, [selectedRoom]);

  // Check if a time slot is booked
  const isTimeSlotBooked = useCallback(
    (slot: string) => {
      return data?.find(
        (reservation: Reservations) =>
          reservation.timeSlot === slot &&
          selectedRoom === reservation.room &&
          reservation.paymentStatus
      );
    },
    [data, selectedRoom]
  );

  // Handle form submission
  async function handleFormSubmit(values: z.infer<typeof ManualBookingSchema>) {
    setPending(true);
    try {
      const validation = ManualBookingSchema.safeParse(values);
      if (wantsLedName && !form.getValues("ledLetterName")) {
        form.setError("ledLetterName", {
          message: "Led Letter Name is required",
        });
        return;
      }
      if (wantsLedAge && !form.getValues("ledLetterAge")) {
        form.setError("ledLetterAge", {
          message: "Led Letter Age is required",
        });
        return;
      }
      if (validation.success) {
        const res = CreateManualBooking(validation.data);
        toast.promise(res, {
          loading: "Creating Booking",
          success: () => {
            window.location.reload();
            return "Successfully created Booking";
          },
          error:
            "Someone has booked another reservation at the same Time Slot!",
        });
      }
    } catch (error) {
      toast.error("An error occurred while creating the booking");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-8"
        >
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="noOfPeople"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Number of People
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter number of people"
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value) || 0;
                          field.onChange(value);
                          setNoOfPeople(value);
                        }}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Package
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedRoom(value);
                        }}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dreamscape Theatre">
                            Dreamscape Theatre
                          </SelectItem>
                          <SelectItem value="Majestic Theatre">
                            Majestic Theatre
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Date</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-11 justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            fromDate={currentDate}
                            toMonth={nextMonthDate}
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setSelectedDate(date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Occasion
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select an occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Birthday">🎂 Birthday</SelectItem>
                          <SelectItem value="Anniversary">
                            💕 Anniversary
                          </SelectItem>
                          <SelectItem value="Bride to be">
                            👰 Bride to be
                          </SelectItem>
                          <SelectItem value="Groom to be">
                            🤵 Groom to be
                          </SelectItem>
                          <SelectItem value="Movie Date">
                            🎬 Movie Date
                          </SelectItem>
                          <SelectItem value="Graduation Party">
                            🎓 Graduation Party
                          </SelectItem>
                          <SelectItem value="Proposal">💍 Proposal</SelectItem>
                          <SelectItem value="Mom to be">
                            🤱 Mom to be
                          </SelectItem>
                          <SelectItem value="Other">🎉 Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Time Slot Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Time Slot Selection</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose your preferred time slot
              </p>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Available Time Slots
                    </FormLabel>
                    <div className="mt-4 gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {availableTimeSlots.map((slot) => {
                        const isBooked = isTimeSlotBooked(slot);
                        const isSelected = field.value === slot;
                        const isDisabled =
                          (selectedRoom === "Dreamscape Theatre" &&
                            noOfPeople > 5) ||
                          isBooked ||
                          isLoading ||
                          !selectedDate ||
                          !selectedRoom ||
                          !noOfPeople;

                        return (
                          <Button
                            key={slot}
                            variant={
                              isSelected
                                ? "default"
                                : isBooked
                                ? "destructive"
                                : "outline"
                            }
                            type="button"
                            onClick={() => {
                              field.onChange(slot);
                              setSelectedTimeSlot(slot);
                            }}
                            disabled={isDisabled}
                            className="h-12 text-sm font-medium"
                          >
                            {slot}
                          </Button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter full name"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email address"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      WhatsApp Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter WhatsApp number"
                        type="text"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameToDisplay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Name to Display
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name for display"
                        type="text"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Add-ons & Extras */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Add-ons & Extras</CardTitle>
              <p className="text-sm text-muted-foreground">
                Enhance your experience with these optional services
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cake"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Cake Selection
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedCake(value);
                          }}
                        >
                          <SelectTrigger
                            value={field.value || ""}
                            onReset={() => {
                              form.resetField("cake");
                              setSelectedCake("");
                            }}
                            className="h-11"
                          >
                            <SelectValue placeholder="Select a cake (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {cakes.map((cake) => (
                              <SelectItem key={cake} value={cake}>
                                {cake}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedCake.length > 0 && (
                  <FormField
                    control={form.control}
                    name="writingOnCake"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Writing on Cake
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Writing on Cake"
                            defaultValue={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="photography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Photography Package
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setPhotography(value);
                          }}
                        >
                          <SelectTrigger
                            className="h-11"
                            value={field.value || ""}
                            onReset={() => {
                              form.resetField("photography");
                              setPhotography("");
                            }}
                          >
                            <SelectValue placeholder="Select photography (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="photoshoot">
                              Photoshoot
                            </SelectItem>
                            <SelectItem value="video">
                              Photography & Video
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Enhanced Switch Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fogEntry"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="space-y-1">
                          <FormLabel className="text-sm font-medium cursor-pointer">
                            Fog Entry
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              setFogEntry(checked);
                            }}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rosePath"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="space-y-1">
                          <FormLabel className="text-sm font-medium cursor-pointer">
                            Rose Path
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              setRosePath(checked);
                            }}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-start justify-between flex-col p-4 h-fit border rounded-lg bg-card">
                  <div className="flex items-center justify-between w-full">
                    <div className="space-y-1">
                      <FormLabel className="text-sm font-medium cursor-pointer">
                        LED Letter Name
                      </FormLabel>
                    </div>
                    <Switch
                      checked={wantsLedName}
                      onCheckedChange={(checked) => {
                        setWantsLedName(checked);
                        form.resetField("ledLetterName", {
                          defaultValue: undefined,
                        });
                      }}
                    />
                  </div>
                  {wantsLedName && (
                    <FormField
                      control={form.control}
                      name="ledLetterName"
                      render={({ field }) => (
                        <FormItem className="mt-4 w-full">
                          <FormControl>
                            <Input
                              placeholder="LED Letter Name"
                              defaultValue={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="flex items-start justify-between flex-col p-4 h-fit border rounded-lg bg-card">
                  <div className="flex items-center justify-between w-full">
                    <div className="space-y-1">
                      <FormLabel className="text-sm font-medium cursor-pointer">
                        LED Letter Age
                      </FormLabel>
                    </div>
                    <Switch
                      checked={wantsLedAge}
                      onCheckedChange={(checked) => {
                        form.resetField("ledLetterAge", {
                          defaultValue: undefined,
                        });
                        setWantsLedAge(checked);
                      }}
                    />
                  </div>
                  {wantsLedAge && (
                    <FormField
                      control={form.control}
                      name="ledLetterAge"
                      render={({ field }) => (
                        <FormItem className="mt-4 w-full">
                          <FormControl>
                            <Input
                              placeholder="LED Letter Age"
                              defaultValue={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Notes</FormLabel>
                    <FormControl>
                      <Textarea value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="advanceAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Advance Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Amount paid in advance"
                          type="number"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value) || 0;
                            field.onChange(value);
                            setAdvanceAmount(value);
                          }}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Discount
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Discount amount"
                          type="number"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value) || 0;
                            field.onChange(value);
                            setDiscount(value);
                          }}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Cost Breakdown */}
              {selectedRoom && advanceAmount > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>{selectedRoom} Base Price:</span>
                      <span className="font-medium">
                        {formatCurrency(calculatedAmounts.basePrice)}
                      </span>
                    </div>

                    {calculatedAmounts.extraPeopleCharge > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Extra People Charge:</span>
                        <span className="font-medium">
                          +{formatCurrency(calculatedAmounts.extraPeopleCharge)}
                        </span>
                      </div>
                    )}

                    {calculatedAmounts.cakeCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Cake ({selectedCake}):</span>
                        <span className="font-medium">
                          +{formatCurrency(calculatedAmounts.cakeCost)}
                        </span>
                      </div>
                    )}

                    {calculatedAmounts.photographyCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Photography ({photography}):</span>
                        <span className="font-medium">
                          +{formatCurrency(calculatedAmounts.photographyCost)}
                        </span>
                      </div>
                    )}

                    {calculatedAmounts.fogEntryCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Fog Entry:</span>
                        <span className="font-medium">
                          +{formatCurrency(calculatedAmounts.fogEntryCost)}
                        </span>
                      </div>
                    )}

                    {calculatedAmounts.rosePathCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Rose Path:</span>
                        <span className="font-medium">
                          +{formatCurrency(calculatedAmounts.rosePathCost)}
                        </span>
                      </div>
                    )}

                    {calculatedAmounts.ledLetterCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>LED Letters:</span>
                        <span className="font-medium">
                          +{formatCurrency(calculatedAmounts.ledLetterCost)}
                        </span>
                      </div>
                    )}

                    {calculatedAmounts.midnightCharge > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Midnight Charges:</span>
                        <span className="font-medium">
                          +{formatCurrency(calculatedAmounts.midnightCharge)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm font-medium border-t pt-3">
                      <span>Total Cost:</span>
                      <span>{formatCurrency(calculatedAmounts.totalCost)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Advance Paid:</span>
                      <span className="font-medium text-green-600">
                        -{formatCurrency(advanceAmount)}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Discount:</span>
                        <span className="font-medium text-green-600">
                          -{formatCurrency(discount)}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Balance Remaining:</span>
                        <span>
                          {formatCurrency(calculatedAmounts.balanceAmount)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              disabled={pending}
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold"
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Booking...
                </div>
              ) : (
                "Create Booking"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
