"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { getReservations } from "@/actions/date";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IoCalendarOutline,
  IoFastFoodOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { capitalizeFirstLetter } from "@/lib/caplitaliseFirstLetter";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GoPeople } from "react-icons/go";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { LuCake, LuSpeaker } from "react-icons/lu";
import { PiTelevision } from "react-icons/pi";
import { useToast } from "@/components/ui/use-toast";
import { CouponSubmitButton } from "@/components/formSubmitButton";
import { checkCoupon } from "@/actions/coupon";
import { useSession } from "next-auth/react";
import { validation } from "@/lib/zodSchemas";
import { Pay } from "@/actions/pay";

type reservations = {
  branch: string;
  timeSlot: string;
  date: Date;
};

export const revalidate = 0;

export default function BookingComponent() {
  const { data: session } = useSession();
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let nextMonth = currentMonth + 1;
  let nextYear = currentDate.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }
  let nextMonthDate = new Date(nextYear, nextMonth, 1);

  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const newDate = new Date(year, month, day);

  const [branch, setBranch] = useState("jayanagar");
  const [theatre, setTheatre] = useState("standard-theatre");
  const [time, setTime] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>(newDate);
  const [occasion, setOccasion] = useState<string | undefined>();
  const [reservations, setReservations] = useState<reservations[]>();
  const [noOfPeople, setNoOfPeople] = useState(2);
  const [theatrePrice, setTheatrePrice] = useState(1000);
  const [cakePrice, setCakePrice] = useState(0);
  const [decorationPrice, setDecorationPrice] = useState(0);
  const [giftPrice, setGiftPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(1000);
  const { toast } = useToast();

  useEffect(() => {
    (async function () {
      setTime(undefined);
      setReservations(undefined);
      const res = await getReservations(date, branch, theatre);
      setReservations(res);
    })();
  }, [date, branch, theatre]);

  useEffect(() => {
    if (theatre == "romantic-theatre") {
      setTheatrePrice(1800);
    }
    if (theatre == "standard-theatre") {
      setTheatrePrice(1000);
    }
    if (noOfPeople == 5 && theatre == "standard-theatre") {
      setTheatrePrice(1200);
    }
    if (noOfPeople == 6 && theatre == "standard-theatre") {
      setTheatrePrice(1400);
    }
    setSubTotal(theatrePrice + cakePrice + decorationPrice + giftPrice);
  }, [
    theatre,
    theatrePrice,
    noOfPeople,
    cakePrice,
    decorationPrice,
    giftPrice,
  ]);

  function handleForm(formData: FormData) {
    const data = Object.fromEntries(formData);
    const validData = validation.safeParse(data);
    if (validData.success == false) {
      toast({
        variant: "destructive",
        title: validData.error.issues[0].message,
      });
    }
    if (validData.success == true) {
      console.log("CALLED SA");
      Pay(validData.data, date, noOfPeople);
    }
  }

  return (
    <div className="flex justify-between flex-col gap-10 lg:flex-row">
      <form
        action={(formData) => handleForm(formData)}
        id="booking-form"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4"
      >
        <input type="hidden" value={occasion} name="occasion" />
        <input type="hidden" value={branch} name="branch" />
        <input type="hidden" value={time} name="time" />
        <input type="hidden" value={theatre} name="theatre" />
        <input type="hidden" value={noOfPeople} name="noOfPeople" />
        <div className="basis-3/4">
          <Label htmlFor="branch">Select a branch</Label>
          <select
            defaultValue={branch || "jayanagar"}
            name="branch"
            className="my-2 flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[200px]"
            onChange={(event) => setBranch(event.target.value)}
          >
            <option value="jayanagar">Jayanagar</option>
            <option value="banshankri">Banshankri</option>
          </select>
          <Calendar
            showOutsideDays={false}
            required
            fromDate={currentDate}
            toMonth={nextMonthDate}
            mode="single"
            selected={date}
            onDayClick={(day) => {
              setDate(day);
            }}
            onSelect={setDate}
            className="rounded-md w-fit border"
          />
          <div className="bg-black p-6 rounded-lg mt-3">
            <Label htmlFor="theatre">Select a Theatre</Label>
            <select
              defaultValue={theatre || "standard-theatre"}
              name="theatre"
              className="my-2 flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[200px]"
              onChange={(event) => setTheatre(event.target.value)}
            >
              <option value="standard-theatre">Standard Theatre</option>
              <option value="romantic-theatre">Romantic Theatre</option>
            </select>
            {theatre == "standard-theatre" ? (
              <div className="flex flex-col gap-y-3">
                <Badge
                  variant="default"
                  className="font-bold p-2 rounded-full w-fit"
                >
                  {reservations == undefined ? 5 : 5 - reservations.length}{" "}
                  slots available
                </Badge>
                <h2 className="font-semibold">₹1,000 for upto 4 people</h2>
                <div className="flex gap-x-3">
                  <Badge variant="secondary" className="p-1 h-fit">
                    Max 6 people
                  </Badge>
                  <Badge variant="secondary" className="p-1 h-fit">
                    Decoration - ₹600
                  </Badge>
                </div>
                <div>
                  <div className="flex gap-x-3 items-center">
                    <GoPeople size={20} />
                    <p>₹200 extra person for more than 4 people</p>
                  </div>
                  <div className="flex gap-x-3 items-center">
                    <PiTelevisionSimpleBold size={20} />
                    <p>135 inch</p>
                    <LuSpeaker size={20} />
                    <p>600W</p>
                  </div>
                  <div className="flex gap-x-3 items-center">
                    <LuCake size={20} />
                    <p>Add cakes and gifts in next step.</p>
                  </div>
                  <div className="flex gap-x-3 items-center">
                    <IoFastFoodOutline size={20} />
                    <p>Food and beverages can be ordered at theater</p>
                  </div>
                </div>
              </div>
            ) : theatre == "romantic-theatre" ? (
              <div className="flex flex-col gap-y-3">
                <Badge
                  variant="default"
                  className="font-bold p-2 rounded-full w-fit"
                >
                  {reservations == undefined ? 5 : 5 - reservations.length}{" "}
                  slots available
                </Badge>
                <h2 className="font-semibold">₹1799 for upto 2 people</h2>
                <div className="flex gap-x-3">
                  <Badge variant="secondary" className="p-1 h-fit">
                    Max 2 people
                  </Badge>
                  <Badge variant="secondary" className="p-1 h-fit">
                    Decoration Included
                  </Badge>
                </div>
                <div>
                  <div className="flex gap-x-3 items-center">
                    <GoPeople size={20} />
                    <p>Extra people not allowed</p>
                  </div>
                  <div className="flex gap-x-3 items-center">
                    <PiTelevisionSimpleBold size={20} />
                    <p>135 inch</p>
                    <LuSpeaker size={20} />
                    <p>600W</p>
                  </div>
                  <div className="flex gap-x-3 items-center">
                    <LuCake size={20} />
                    <p>Add cakes and gifts in next step.</p>
                  </div>
                  <div className="flex gap-x-3 items-center">
                    <IoFastFoodOutline size={20} />
                    <p>Food and beverages can be ordered at theater</p>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="mt-3">
              <h1 className="font-medium">Choose a time slot</h1>
              <div className="flex gap-3 mt-2 flex-wrap">
                {reservations?.find((item) => item.timeSlot == "8AM - 10AM") ||
                reservations == undefined ? (
                  <Button variant={"secondary"} disabled className="flex-1">
                    8AM - 10AM
                  </Button>
                ) : (
                  <Button
                    variant={time == "8AM - 10AM" ? "default" : "secondary"}
                    onClick={() => setTime("8AM - 10AM")}
                    className="flex-1"
                    type="button"
                  >
                    8AM - 10AM
                  </Button>
                )}
                {reservations?.find((item) => item.timeSlot == "10AM - 12PM") ||
                reservations == undefined ? (
                  <Button variant={"secondary"} disabled className="flex-1">
                    10AM - 12PM
                  </Button>
                ) : (
                  <Button
                    variant={time == "10AM - 12PM" ? "default" : "secondary"}
                    onClick={() => setTime("10AM - 12PM")}
                    className="flex-1"
                    type="button"
                  >
                    10AM - 12PM
                  </Button>
                )}
                {reservations?.find((item) => item.timeSlot == "12PM - 2PM") ||
                reservations == undefined ? (
                  <Button variant={"secondary"} disabled className="flex-1">
                    12PM - 2PM
                  </Button>
                ) : (
                  <Button
                    variant={time == "12PM - 2PM" ? "default" : "secondary"}
                    onClick={() => setTime("12PM - 2PM")}
                    className="flex-1"
                    type="button"
                  >
                    12PM - 2PM
                  </Button>
                )}
                {reservations?.find((item) => item.timeSlot == "2PM - 4PM") ||
                reservations == undefined ? (
                  <Button variant={"secondary"} disabled className="flex-1">
                    2PM - 4PM
                  </Button>
                ) : (
                  <Button
                    variant={time == "2PM - 4PM" ? "default" : "secondary"}
                    onClick={() => setTime("2PM - 4PM")}
                    className="flex-1"
                    type="button"
                  >
                    2PM - 4PM
                  </Button>
                )}
                {reservations?.find((item) => item.timeSlot == "4PM - 6PM") ||
                reservations == undefined ? (
                  <Button variant={"secondary"} disabled className="flex-1">
                    4PM - 6PM
                  </Button>
                ) : (
                  <Button
                    variant={time == "4PM - 6PM" ? "default" : "secondary"}
                    onClick={() => setTime("4PM - 6PM")}
                    className="flex-1"
                    type="button"
                  >
                    4PM - 6PM
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Separator className="mt-[30px] mb-[30px] w-full" />
          <div className="mt-5">
            <h1 className="font-medium text-xl">Overview</h1>
            <div className="flex gap-3 mt-3 flex-wrap">
              <div className="flex gap-x-2">
                <IoLocationOutline size={22} />
                <h1>{capitalizeFirstLetter(branch)}</h1>
              </div>
              <div className="flex gap-x-2">
                <IoCalendarOutline size={22} />
                <h1>{date?.toString().slice(0, 15)}</h1>
              </div>
              <div className={`flex gap-x-2`}>
                <PiTelevision size={22} />
                <h1>
                  {theatre == "standard-theatre"
                    ? "Standard Theatre"
                    : theatre == "romantic-theatre"
                    ? "Romantic Theatre"
                    : ""}
                </h1>
              </div>
              <div className={`flex gap-x-2 ${time == undefined && "hidden"}`}>
                <IoMdTime size={22} />
                <h1>{time}</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {theatre !== "romantic-theatre" && (
                <div>
                  <Label htmlFor="numberOfPeople">Number of people</Label>
                  <select
                    defaultValue={2 as number}
                    required
                    name="noOfPeople"
                    onChange={(e) => setNoOfPeople(Number(e.target.value))}
                    className="my-2 flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full"
                  >
                    <option value={2 as number}>2</option>
                    <option value={3 as number}>3</option>
                    <option value={4 as number}>4</option>
                    <option value={5 as number}>5</option>
                    <option value={6 as number}>6</option>
                  </select>
                </div>
              )}
              <div>
                <Label htmlFor="bookingName">Booking Name</Label>
                <Input
                  name="bookingName"
                  defaultValue={session?.user?.name ?? ""}
                  className="my-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  className="my-2"
                  defaultValue={session?.user?.email ?? ""}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">WhatsApp Number</Label>
                <Input name="phone" className="my-2" type="number" required />
              </div>
            </div>
            <Separator className="my-[30px] w-full" />
            <div>
              <h1 className="font-medium text-xl">Select the Ocassion</h1>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button
                  variant={"default"}
                  type="button"
                  size={"lg"}
                  className={`flex-1 min-w-[150px] h-[150px] ${
                    occasion == "Birthday" && "border-[2px] border-primary"
                  }`}
                  onClick={() => setOccasion("Birthday")}
                >
                  Birthday
                </Button>
                <Button
                  variant={"default"}
                  type="button"
                  size={"lg"}
                  className={`flex-1 min-w-[150px] h-[150px] ${
                    occasion == "Anniversary" && "border-[2px] border-primary"
                  }`}
                  onClick={() => setOccasion("Anniversary")}
                >
                  Anniversary
                </Button>
                <Button
                  variant={"default"}
                  type="button"
                  size={"lg"}
                  className={`flex-1 min-w-[150px] h-[150px] ${
                    occasion == "Romantic Date" && "border-[2px] border-primary"
                  }`}
                  onClick={() => setOccasion("Romantic Date")}
                >
                  Romantic Date
                </Button>
                <Button
                  variant={"default"}
                  type="button"
                  size={"lg"}
                  className={`flex-1 min-w-[150px] h-[150px] ${
                    occasion == "Marriage Proposal" &&
                    "border-[2px] border-primary"
                  }`}
                  onClick={() => setOccasion("Marriage Proposal")}
                >
                  Marriage Proposal
                </Button>
                <Button
                  variant={"default"}
                  type="button"
                  size={"lg"}
                  className={`flex-1 min-w-[150px] h-[150px] ${
                    occasion == "Bride to be" && "border-[2px] border-primary"
                  }`}
                  onClick={() => setOccasion("Bride to be")}
                >
                  Bride to be
                </Button>
                <Button
                  variant={"default"}
                  type="button"
                  size={"lg"}
                  className={`flex-1 min-w-[150px] h-[150px] ${
                    occasion == "Farewell" && "border-[2px] border-primary"
                  }`}
                  onClick={() => setOccasion("Farewell")}
                >
                  Farewell
                </Button>
                <Button
                  variant={"default"}
                  type="button"
                  size={"lg"}
                  className={`flex-1 min-w-[150px] h-[150px] ${
                    occasion == "Congratulations" &&
                    "border-[2px] border-primary"
                  }`}
                  onClick={() => setOccasion("Congratulations")}
                >
                  Congratulations
                </Button>
                <Button
                  variant={"default"}
                  type="button"
                  size={"lg"}
                  className={`flex-1 min-w-[150px] h-[150px] ${
                    occasion == "Baby Shower" && "border-[2px] border-primary"
                  }`}
                  onClick={() => setOccasion("Baby Shower")}
                >
                  Baby Shower
                </Button>
              </div>
            </div>
            <Separator className="my-[30px] w-full" />
            <div className="my-10">
              <h1 className="font-medium text-xl mb-5">
                Additional Addons (Optional)
              </h1>
              <Label htmlFor="cake">Select a Cake</Label>
              <select
                defaultValue={"none"}
                name="cake"
                onChange={(e) => {
                  if (e.target.value == "none") {
                    setCakePrice(0);
                  } else {
                    setCakePrice(600);
                  }
                }}
                className="my-2 flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full"
              >
                <option value="none">None</option>
                <option value="black-forest">Black Forest ₹600</option>
                <option value="butterscotch">Butterscotch ₹600</option>
              </select>
              <Label htmlFor="decoration">Select decoration</Label>
              <select
                defaultValue={"none"}
                onChange={(e) => {
                  if (e.target.value == "none") {
                    setDecorationPrice(0);
                  } else {
                    setDecorationPrice(500);
                  }
                }}
                name="decoration"
                className="my-2 w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              >
                <option value="none">None</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 1">Option 2</option>
              </select>
              <Label htmlFor="gifts">Select gifts</Label>
              <select
                onChange={(e) => {
                  if (e.target.value == "none") {
                    setGiftPrice(0);
                  } else {
                    setGiftPrice(500);
                  }
                }}
                defaultValue={"none"}
                name="gifts"
                className="my-2 w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              >
                <option value="none">None</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 1">Option 2</option>
              </select>
            </div>
          </div>
        </div>
        <div className="basis-2/4 pb-10">
          <div className="sticky top-[110px]">
            <h1 className="font-medium text-2xl">Booking Summary</h1>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <h1>
                {theatre == "standard-theatre"
                  ? "Standard Theatre"
                  : theatre == "romantic-theatre"
                  ? "Romantic Theatre"
                  : ""}{" "}
                ({theatre == "romantic-theatre" ? 2 : noOfPeople} people)
              </h1>
              <h1 className="text-right">₹{theatrePrice}</h1>
              {cakePrice !== undefined && cakePrice !== 0 && (
                <>
                  <h1>Cake</h1>
                  <h1 className="text-right">₹600</h1>
                </>
              )}
              {decorationPrice !== 0 && decorationPrice !== undefined && (
                <>
                  <h1>Decoration</h1>
                  <h1 className="text-right">₹{decorationPrice}</h1>
                </>
              )}
              {giftPrice !== 0 && giftPrice !== undefined && (
                <>
                  <h1>Gifts</h1>
                  <h1 className="text-right">₹{giftPrice}</h1>
                </>
              )}
              <div className="mt-5">
                <Label htmlFor="coupon" form="couponForm">
                  Have a Coupon?
                </Label>
                <div className="flex gap-3 my-2">
                  <Input
                    type="string"
                    name="coupon"
                    id="coupon"
                    form="couponForm"
                    placeholder="Enter your Code Here"
                  />
                  <CouponSubmitButton />
                </div>
              </div>
              <Button
                variant={"default"}
                type="submit"
                className="w-full mt-3 font-bold"
                form="booking-form"
              >
                Pay ₹750
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
