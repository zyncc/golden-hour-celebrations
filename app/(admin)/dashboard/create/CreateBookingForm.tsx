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
  dreamscapeTimeSlots,
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
      photography: undefined,
      fogEntry: false,
      rosePath: false,
      balanceAmount: undefined,
      discount: 0,
      advanceAmount: undefined,
      noOfPeople: undefined,
    },
  });

  // Fetch reservations query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getReservation", selectedDate?.toISOString(), selectedRoom],
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    enabled: !!selectedDate,
    queryFn: async () => {
      if (!selectedDate) return [];
      const res = await fetch(
        `/api/fetchReservations?date=${selectedDate.toISOString()}`
      );
      return res.json();
    },
  });

  // Calculate total cost and balance amount
  const calculatedAmounts = useMemo(() => {
    let totalCost = 0;

    // Base room cost
    if (selectedRoom === "Dreamscape Theatre") {
      totalCost += 1499;
    } else if (selectedRoom === "Majestic Theatre") {
      totalCost += 1899;
    }

    // Additional people cost
    if (selectedRoom === "Dreamscape Theatre" && noOfPeople > 2) {
      totalCost += (noOfPeople - 2) * 200;
    } else if (selectedRoom === "Majestic Theatre" && noOfPeople > 4) {
      totalCost += (noOfPeople - 4) * 200;
    }

    // Cake cost
    if (selectedCake) {
      if (selectedCake === "Red velvet" || selectedCake === "Rasmalai") {
        totalCost += 620;
      } else {
        totalCost += cakePrice;
      }
    }

    // Add-ons
    if (fogEntry) totalCost += 400;
    if (rosePath) totalCost += 400;

    // Photography
    if (photography === "photoshoot") {
      totalCost += 700;
    } else if (photography === "video") {
      totalCost += 1500;
    }

    const balanceAmount = totalCost - advanceAmount - discount;

    return {
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
    <Form {...form}>
      <form
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <FormField
          control={form.control}
          name="noOfPeople"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>No of People</FormLabel>
              <FormControl>
                <Input
                  placeholder="No of People"
                  type="number"
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value) || 0;
                    field.onChange(value);
                    setNoOfPeople(value);
                  }}
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
              <FormLabel>Package</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ""}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedRoom(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Package" />
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
              <FormLabel>Pick your Date</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
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
                  <PopoverContent className="p-0">
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
          name="timeSlot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Slot</FormLabel>
              <div className="mt-3 gap-2 grid grid-cols-2 md:grid-cols-3">
                {availableTimeSlots.map((slot) => {
                  const isBooked = isTimeSlotBooked(slot);
                  const isSelected = field.value === slot;
                  const isDisabled =
                    (selectedRoom === "Dreamscape Theatre" && noOfPeople > 5) ||
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
                      onClick={() => field.onChange(slot)}
                      disabled={isDisabled}
                      className="flex-1"
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

        <FormField
          control={form.control}
          name="occasion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Occasion</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Birthday">Birthday</SelectItem>
                    <SelectItem value="Anniversary">Anniversary</SelectItem>
                    <SelectItem value="Bride to be">Bride to be</SelectItem>
                    <SelectItem value="Groom to be">Groom to be</SelectItem>
                    <SelectItem value="Movie Date">Movie Date</SelectItem>
                    <SelectItem value="Graduation Party">
                      Graduation Party
                    </SelectItem>
                    <SelectItem value="Proposal">Proposal</SelectItem>
                    <SelectItem value="Mom to be">Mom to be</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone" type="text" {...field} />
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
              <FormLabel>Name to Display</FormLabel>
              <FormControl>
                <Input placeholder="Name to Display" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cake"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cake (Optional)</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ""}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCake(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Cake" />
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

        <FormField
          control={form.control}
          name="photography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photography (Optional)</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ""}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setPhotography(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Photography Package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photoshoot">Photoshoot</SelectItem>
                    <SelectItem value="video">Photography & Video</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row justify-between gap-x-4">
          <FormField
            control={form.control}
            name="advanceAmount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Advance Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Amount Paid"
                    type="number"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value) || 0;
                      field.onChange(value);
                      setAdvanceAmount(value);
                    }}
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
              <FormItem className="flex-1">
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Discount"
                    type="number"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value) || 0;
                      field.onChange(value);
                      setDiscount(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="fogEntry"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-x-4">
                  <FormLabel>Wants Fog Entry (Optional)</FormLabel>
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
                <div className="flex items-center gap-x-4">
                  <FormLabel>Wants Rose Path (Optional)</FormLabel>
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
        </div>

        {selectedRoom && advanceAmount > 0 && (
          <div className="mt-5 p-4 bg-muted rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Cost:</span>
                <span className="font-medium">
                  {formatCurrency(calculatedAmounts.totalCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Advance Paid:</span>
                <span className="font-medium">
                  -{formatCurrency(advanceAmount)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="font-medium">
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}
              <hr />
              <div className="flex justify-between text-lg font-semibold">
                <span>Balance Remaining:</span>
                <span>{formatCurrency(calculatedAmounts.balanceAmount)}</span>
              </div>
            </div>
          </div>
        )}

        <Button
          disabled={pending}
          type="submit"
          className="w-full font-medium lg:col-span-2"
        >
          {pending ? "Creating..." : "Create Booking"}
        </Button>
      </form>
    </Form>
  );
}
