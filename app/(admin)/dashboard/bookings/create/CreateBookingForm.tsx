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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Reservations } from "@prisma/client";
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
import { z } from "zod";
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
  let nextMonthDate = new Date(nextYear, nextMonth, 1);

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>();
  const [advanceAmount, setAdvanceAmount] = useState<number>();
  const [discount, setDiscount] = useState<number>(0);
  const [noOfPeople, setNoOfPeople] = useState<number>();
  const [balanceAmount, setBalanceAmount] = useState<number>();

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

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getReservation"],
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await fetch(
        `/api/fetchReservations?date=${form.getValues("date").toISOString()}`
      );
      return res.json();
    },
  });

  const room = form.watch("room");
  const date = form.watch("date");
  const cake = form.watch("cake");
  const fogEntry = form.watch("fogEntry");
  const rosePath = form.watch("rosePath");
  const photography = form.watch("photography");

  useEffect(() => {
    refetch();
  }, [room, date, refetch]);

  useEffect(() => {
    form.resetField("timeSlot");
  }, [room, date, form, noOfPeople]);

  // Calculate Balance Amount
  useEffect(() => {
    if (!advanceAmount) {
      return;
    }
    let balanceAmount = -advanceAmount;
    if (room == "Dreamscape Theatre") {
      balanceAmount += 1499;
    } else if (room == "Majestic Theatre") {
      balanceAmount += 1899;
    }
    if (cake) {
      balanceAmount += cakePrice;
    }
    if (fogEntry) {
      balanceAmount += 400;
    }
    if (rosePath) {
      balanceAmount += 400;
    }
    if (photography == "30") {
      balanceAmount += 700;
    } else if (photography == "60") {
      balanceAmount += 1000;
    }
    if (room == "Dreamscape Theatre" && noOfPeople && noOfPeople > 2) {
      balanceAmount += (noOfPeople - 2) * 200;
    } else if (room == "Majestic Theatre" && noOfPeople && noOfPeople > 4) {
      balanceAmount += (noOfPeople - 4) * 200;
    }
    setBalanceAmount(balanceAmount - discount);
    form.setValue("balanceAmount", balanceAmount);
  }, [
    advanceAmount,
    cake,
    fogEntry,
    rosePath,
    room,
    photography,
    form,
    discount,
    noOfPeople,
  ]);

  async function handleFormSubmit(values: z.infer<typeof ManualBookingSchema>) {
    setPending(true);
    const validation = ManualBookingSchema.safeParse(values);
    if (validation.success) {
      const res = CreateManualBooking(validation.data);
      toast.promise(res, {
        loading: "Creating Booking",
        success: () => {
          window.document.location.reload();
          return "Succesfully created Booking";
        },
        error: "Someone has booked another reservation at the same Time Slot!",
      });
    }
    setPending(false);
  }

  return (
    <>
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
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                      setNoOfPeople(parseInt(e.target.value));
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
                    value={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                      setSelectedRoom(e);
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
                        variant={"outline"}
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
                  {selectedRoom === "Dreamscape Theatre"
                    ? dreamscapeTimeSlots.map((slot) => (
                        <Button
                          variant={
                            field.value === slot
                              ? "default"
                              : data?.find(
                                  (reservation: Reservations) =>
                                    reservation.timeSlot === slot &&
                                    form.getValues("room") ===
                                      reservation.room &&
                                    reservation.paymentStatus
                                )
                              ? "destructive"
                              : "outline"
                          }
                          type="button"
                          onClick={() => field.onChange(slot)}
                          key={slot}
                          disabled={
                            noOfPeople! > 5 ||
                            data?.find(
                              (reservation: Reservations) =>
                                reservation.timeSlot === slot &&
                                form.getValues("room") === reservation.room &&
                                reservation.paymentStatus
                            ) ||
                            isLoading ||
                            !form.getValues("date") ||
                            !form.getValues("room") ||
                            !noOfPeople
                          }
                          className={"flex-1"}
                        >
                          {slot}
                        </Button>
                      ))
                    : majesticTimeSlots.map((slot) => (
                        <Button
                          variant={
                            field.value === slot
                              ? "default"
                              : data?.find(
                                  (reservation: Reservations) =>
                                    reservation.timeSlot === slot &&
                                    form.getValues("room") ===
                                      reservation.room &&
                                    reservation.paymentStatus
                                )
                              ? "destructive"
                              : "outline"
                          }
                          type="button"
                          onClick={() => field.onChange(slot)}
                          key={slot}
                          disabled={
                            data?.find(
                              (reservation: Reservations) =>
                                reservation.timeSlot === slot &&
                                form.getValues("room") === reservation.room &&
                                reservation.paymentStatus
                            ) ||
                            isLoading ||
                            !form.getValues("date") ||
                            !form.getValues("room") ||
                            !noOfPeople
                          }
                          className={"flex-1"}
                        >
                          {slot}
                        </Button>
                      ))}
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
                  <Input placeholder={"Name"} {...field} />
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
                  <Input placeholder={"Email"} {...field} />
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Photography Package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Minutes Package</SelectItem>
                      <SelectItem value="60">60 Minutes Package</SelectItem>
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
                      placeholder="Amound Paid"
                      type="number"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                        setAdvanceAmount(parseInt(e.target.value));
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
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                        setDiscount(parseInt(e.target.value));
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
                        onCheckedChange={field.onChange}
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
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={`${!room || !advanceAmount ? "hidden" : "mt-5"}`}>
            <h1>Balance Amount Remaining</h1>
            <p>{formatCurrency(balanceAmount || 0)}</p>
          </div>
          <Button
            disabled={pending}
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-300 text-black font-medium"
          >
            {pending ? "Creating" : "Create Booking"}
          </Button>
        </form>
      </Form>
    </>
  );
}
