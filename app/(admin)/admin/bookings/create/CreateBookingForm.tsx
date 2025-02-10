"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ManualBookingSchema } from "@/lib/zodSchemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Reservations } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { CreateUser } from "@/actions/createUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formatCurrency from "@/lib/formatCurrency";
import { CreateManualBooking } from "@/actions/createReservation";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

const timeSlots = [
  "10AM - 12PM",
  "12PM - 2PM",
  "2PM - 4PM",
  "4PM - 6PM",
  "6PM - 8PM",
  "8PM - 10PM",
];

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

  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [packageType, setPackageType] = useState<string>();
  const [advanceAmount, setAdvanceAmount] = useState<number>();
  const [balanceAmount, setBalanceAmount] = useState<number>();
  const [pending, setPending] = useState(false);
  const [timeSlot, setTimeSlot] = useState<string>();

  async function handleFormSubmit(FormData: FormData) {
    setPending(true);
    const formData = Object.fromEntries(FormData);
    const data = {
      ...formData,
      packageType,
      advanceAmount,
      balanceAmount,
      timeSlot,
      date,
    };

    const checkValidation = ManualBookingSchema.safeParse(data);
    if (checkValidation.success) {
      CreateUser({
        email: checkValidation.data.email,
        name: checkValidation.data.name,
        phone: checkValidation.data.phone,
      });
      const res = await CreateManualBooking(checkValidation.data);
      if (res?.title) {
        toast({
          variant: "destructive",
          title: res.title,
          description: res.description,
        });
      }
      setPending(false);
      router.refresh();
    }
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getReservation"],
    refetchInterval: 1000 * 20,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await fetch(
        `/api/fetchReservations?date=${date?.toISOString()}`
      );
      return res.json();
    },
  });

  useEffect(() => {
    refetch();
  }, [packageType, date, refetch]);

  useEffect(() => {
    if (packageType === "Basic Package") {
      setBalanceAmount(1999 - advanceAmount!);
    } else if (packageType === "Standard Package") {
      setBalanceAmount(2999 - advanceAmount!);
    } else if (packageType === "Premium Package") {
      setBalanceAmount(3999 - advanceAmount!);
    }
  }, [packageType, advanceAmount]);

  return (
    <>
      <form
        className="space-y-8 w-full"
        action={(formData) => handleFormSubmit(formData)}
      >
        <div className="flex flex-col gap-y-3">
          <Label htmlFor="name">Enter your Name</Label>
          <Input placeholder={"Name"} name="name" />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label>Enter your Whatsapp Number</Label>
          <Input
            placeholder="Phone"
            type="text"
            maxLength={10}
            minLength={10}
            name="phone"
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label>Enter your Email</Label>
          <Input placeholder="Email" type="email" name="email" />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label>Choose Occasion</Label>
          <select
            name="occasion"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Bride / Groom to be">Bride / Groom to be</option>
            <option value="Graduation Party">Graduation Party</option>
            <option value="Proposal">Proposal</option>
            <option value="Mom to be">Mom to be</option>
            <option value="Other Surprises">Other Surprises</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-3">
          <Label>Pick your Date</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                fromDate={currentDate}
                toMonth={nextMonthDate}
                selected={date}
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Package</Label>
          <Select value={packageType} onValueChange={setPackageType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basic Package">Basic Package</SelectItem>
              <SelectItem value="Standard Package">Standard Package</SelectItem>
              <SelectItem value="Premium Package">Premium Package</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-x-5 flex-col">
          <Label>Time Slot</Label>
          <div className="flex gap-5 mt-3 flex-wrap">
            {timeSlots.map((slot) => (
              <Button
                variant={
                  timeSlot == slot
                    ? "default"
                    : data?.find(
                        (reservation: Reservations) =>
                          reservation.timeSlot == slot &&
                          packageType == reservation.room &&
                          reservation.paymentStatus
                      )
                    ? "destructive"
                    : "outline"
                }
                type="button"
                onClick={() => setTimeSlot(slot)}
                key={slot}
                disabled={
                  data?.find(
                    (reservation: Reservations) =>
                      reservation.timeSlot == slot &&
                      packageType == reservation.room &&
                      reservation.paymentStatus
                  ) ||
                  isLoading ||
                  !date ||
                  !packageType
                }
                className={"flex-1"}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label>Advance Amount</Label>
          <Input
            className="mt-3"
            placeholder="Amound Paid"
            onChange={(value) => setAdvanceAmount(Number(value.target.value))}
            type="number"
          />
          <div
            className={`${
              !date || !packageType || !advanceAmount ? "hidden" : "mt-5"
            }`}
          >
            <h1>Balance Amount Remaining</h1>
            <p>{formatCurrency(balanceAmount || 0)}</p>
          </div>
        </div>
        <Button
          disabled={pending}
          type="submit"
          className="w-full"
          variant={"secondary"}
        >
          {pending && <Loader2 className="animate-spin" />}
          Create Booking
        </Button>
      </form>
    </>
  );
}
