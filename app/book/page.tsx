"use client";

import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

const items = [
  {
    theatre: "Family Theatre",
    noPeople: 7,
    decoration: "₹750 extra",
    price: 1399,
    photo: [
      "https://images.pexels.com/photos/7507067/pexels-photo-7507067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7180617/pexels-photo-7180617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  {
    theatre: "Family Theatre",
    noPeople: 7,
    decoration: "₹750 extra",
    price: 1399,
    photo: [
      "https://images.pexels.com/photos/7507067/pexels-photo-7507067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7180617/pexels-photo-7180617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  {
    theatre: "Family Theatre",
    noPeople: 7,
    decoration: "₹750 extra",
    price: 1399,
    photo: [
      "https://images.pexels.com/photos/7507067/pexels-photo-7507067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7180617/pexels-photo-7180617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  {
    theatre: "Family Theatre",
    noPeople: 7,
    decoration: "₹750 extra",
    price: 1399,
    photo: [
      "https://images.pexels.com/photos/7507067/pexels-photo-7507067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7180617/pexels-photo-7180617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
];

export default function Book() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let nextMonth = currentMonth + 1;
  let nextYear = currentDate.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }
  let nextMonthDate = new Date(nextYear, nextMonth, 1);
  const [date, setDate] = useState<Date>();
  const searchParams = useSearchParams();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 3000 }),
  ]);
  const packages = Number(searchParams.get("package"));
  let step = Number(searchParams.get("step"));
  if (!step) {
    step = 1;
  }
  const router = useRouter();
  return (
    <div className={"mt-[100px] container mx-auto"}>
      <div
        className={
          "flex rounded-full py-2 justify-center gap-x-10 items-center font-medium text-xs flex-wrap gap-y-3"
        }
      >
        <div>
          <h1
            className={`${
              step == 1 && "text-yellow-500"
            } flex items-center gap-x-3 font-medium`}
          >
            <TbCircleNumber1Filled
              color={`step == 1 ? "#eab308" : "#ffffff"`}
              fontSize={"40px"}
            />
            Choose Date
          </h1>
        </div>
        <div>
          <h1
            className={`${
              step == 2 && "text-yellow-500"
            } flex items-center gap-x-3 font-medium`}
          >
            <TbCircleNumber2Filled
              color={`step == 2 ? "#eab308" : "#ffffff"`}
              fontSize={"40px"}
            />
            Select Package
          </h1>
        </div>
        <div>
          <h1
            className={`${
              step == 3 && "text-yellow-500"
            } flex items-center gap-x-3 font-medium`}
          >
            <TbCircleNumber3Filled
              color={`step == 3 ? "#eab308" : "#ffffff"`}
              fontSize={"40px"}
            />
            Payment
          </h1>
        </div>
      </div>
      {step == 1 ? (
        <div className={"mt-10 flex"}>
          <div className={"basis-1/2 flex flex-col gap-y-5"}>
            <div>
              <Label htmlFor={"name"}>Enter your Name</Label>
              <Input
                placeholder={"Name"}
                name={"name"}
                className={"mt-2"}
                required={true}
              />
            </div>
            <div>
              <Label htmlFor={"phone"}>Enter your Whatsapp Number</Label>
              <Input
                placeholder={"Phone"}
                type={"number"}
                name={"phone"}
                className={"mt-2"}
                required={true}
              />
            </div>
            <div className={"flex flex-col gap-y-3"}>
              <Label>How did you find us?</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue className={"mt-2"} placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="socialmedia">
                    Instagram / Facebook
                  </SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="friend">Word of mouth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={"flex flex-col gap-y-3"}>
              <Label>Choose Occasion</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue className={"mt-2"} placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="bride-groom">
                    Bride / Groom to be
                  </SelectItem>
                  <SelectItem value="graduation">Graduation Party</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="mom">Mom to be</SelectItem>
                  <SelectItem value="others">Other Surprises</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={"flex flex-col gap-y-4"}>
              <Label>Pick your Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              type={"submit"}
              variant={"outline"}
              onClick={() => {
                router.push("?step=2");
              }}
            >
              Next
            </Button>
          </div>
        </div>
      ) : step == 2 ? (
        <div className={"mt-10 w-full flex"}>
          <div className={"flex flex-col gap-y-5 w-full"}>
            <div className={"w-full grid gap-x-4 gap-y-6 grid-cols-3"}>
              {items.map((item, i) => (
                <div key={i} className="flex flex-col gap-y-3 md:col-span-1">
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
            {/* <div className={"flex gap-x-3"}>
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
            </div> */}
          </div>
        </div>
      ) : step == 3 ? (
        <div className={"mt-10 flex"}>
          <div className={"basis-1/2 flex flex-col gap-y-5"}>
            <div>
              <Label htmlFor={"name"}>Enter your Name</Label>
              <Input
                placeholder={"Name"}
                name={"name"}
                className={"mt-2"}
                required={true}
              />
            </div>
            <div>
              <Label htmlFor={"phone"}>Enter your Whatsapp Number</Label>
              <Input
                placeholder={"Phone"}
                type={"number"}
                name={"phone"}
                className={"mt-2"}
                required={true}
              />
            </div>
            <div className={"flex flex-col gap-y-3"}>
              <Label>How did you find us?</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue className={"mt-2"} placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="socialmedia">
                    Instagram / Facebook
                  </SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="friend">Word of mouth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={"flex flex-col gap-y-3"}>
              <Label>Choose Occasion</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue className={"mt-2"} placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="bride-groom">
                    Bride / Groom to be
                  </SelectItem>
                  <SelectItem value="graduation">Graduation Party</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="mom">Mom to be</SelectItem>
                  <SelectItem value="others">Other Surprises</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={"flex flex-col gap-y-4"}>
              <Label>Pick your Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
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
                </PopoverContent>
              </Popover>
            </div>
            <div className={"w-full flex gap-x-3"}>
              <Button
                type={"submit"}
                className={"w-full"}
                variant={"outline"}
                onClick={() => {
                  router.push("?step=2");
                }}
              >
                Back
              </Button>
              <Button
                type={"submit"}
                className={"w-full"}
                variant={"secondary"}
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
