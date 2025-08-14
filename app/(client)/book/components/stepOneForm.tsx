"use client";
import { useState } from "react";
import type { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useReservation } from "@/context/ReservationStore";
import { StepOneFormSchema } from "@/lib/zodSchemas";
import { CreateUser } from "@/actions/createUser";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Separator } from "@/components/ui/separator";

export default function StepOneForm() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let nextMonth = currentMonth + 1;
  let nextYear = currentDate.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }
  const nextMonthDate = new Date(nextYear, nextMonth, 1);

  const router = useRouter();
  const { setReservationData, reservation } = useReservation();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof StepOneFormSchema>>({
    resolver: zodResolver(StepOneFormSchema),
    defaultValues: {
      name: reservation?.name || "",
      phone: reservation?.phone || "",
      email: reservation?.email || "",
      findus: reservation?.findus || "",
      occasion: reservation?.occasion || "",
      noOfPeople: reservation?.noOfPeople || 0,
      date: reservation?.date || undefined,
    },
  });

  function handleFormSubmit(values: z.infer<typeof StepOneFormSchema>) {
    CreateUser({
      email: values.email,
      name: values.name,
      phone: values.phone,
    });

    setReservationData(undefined);
    setReservationData(values);
    router.push("/book?step=2", {
      scroll: true,
    });
  }

  return (
    <div className={"my-16 flex gap-10 items-start flex-col md:flex-row"}>
      <div
        className={
          "flex w-full items-center mb-8 justify-center flex-1 flex-col"
        }
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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
                  <FormLabel>Enter your Whatsapp Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone"
                      type="text"
                      maxLength={10}
                      minLength={10}
                      {...field}
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
                  <FormLabel>Enter your Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="findus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you find us?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Instagram / Facebook">
                        Instagram / Facebook
                      </SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="Word of mouth">
                        Word of mouth
                      </SelectItem>
                      <SelectItem value="Other Advertisements">
                        Other Advertisements
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
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
                      <SelectItem value="Movie Date">🎬 Movie Date</SelectItem>
                      <SelectItem value="Graduation Party">
                        🎓 Graduation Party
                      </SelectItem>
                      <SelectItem value="Proposal">💍 Proposal</SelectItem>
                      <SelectItem value="Mom to be">🤱 Mom to be</SelectItem>
                      <SelectItem value="Other">🎉 Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noOfPeople"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Number of People</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of People"
                      type="number"
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value) || 0;
                        field.onChange(value);
                      }}
                    />
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
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
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
                      </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type={"submit"}
              className="w-full bg-highlight hover:bg-highlight-foreground"
              variant={"default"}
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-6 rounded-lg w-full flex-1 bg-card p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Visit Us</h2>
          <div className="flex items-start space-x-2">
            <MapPin className="mt-1 h-5 w-5 shrink-0" />
            <div className="text-muted-foreground">
              <p>1st floor, #66, 29th main,</p>
              <p>29th A Cross Rd, Geetha Colony,</p>
              <p>4th Block, Jayanagar, 560041</p>
              <Separator className="my-2" />

              <Link href={"tel:9739204918"}>Call us - 9739204918</Link>
            </div>
          </div>
        </div>
        {/* Google Maps Embed */}
        <div className="aspect-square overflow-hidden rounded-lg lg:aspect-[4/3]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.667895154625!2d77.58295797630976!3d12.929053887382432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15ccac350657%3A0xfeeb73c49998e57b!2sGolden%20Hour%20private%20theatre%20Celebration!5e0!3m2!1sen!2sin!4v1735631684154!5m2!1sen!2sin"
            className="invert-[90%]"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Opening Hours</h3>
          <p className="text-sm text-muted-foreground">
            Everyday: 9:00 AM - 9:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}
