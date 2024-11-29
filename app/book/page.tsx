"use client";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { FiGift } from "react-icons/fi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
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
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: "Package 1",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: "Package 2",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: "Package 3",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: "Package 4",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];

export default function Book() {
  const [date, setDate] = useState<Date>();
  const searchParams = useSearchParams();
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
            } flex items-center gap-x-3`}
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
            } flex items-center gap-x-3`}
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
            } flex items-center gap-x-3`}
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
            <BentoGrid className={"w-full"}>
              {items.map((item, i) => (
                <BentoGridItem
                  onClick={() => {
                    router.push(`?step=2&packages=${i + 1}`);
                  }}
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={`${item.className} ${
                    packages == i + 1 && "border-2 border-yellow-600"
                  }`}
                  icon={item.icon}
                />
              ))}
            </BentoGrid>
            <div className={"flex gap-x-3"}>
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
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
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
              <Button type={"submit"} className={"w-full"} variant={"fancy"}>
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
