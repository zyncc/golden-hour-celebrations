"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useReservation } from "@/context/ReservationStore";
import { StepThreeFormSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import { redirect, useRouter } from "next/navigation";

export default function StepThreeForm() {
  const { reservation, setReservationData } = useReservation();
  const router = useRouter();

  if (reservation == undefined) {
    redirect("/book");
  }

  const form = useForm<z.infer<typeof StepThreeFormSchema>>({
    resolver: zodResolver(StepThreeFormSchema),
    defaultValues: {
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email,
      findus: reservation.findus,
      occasion: reservation.occasion,
      noOfPeople: reservation.noOfPeople,
    },
  });

  function onSubmit(values: z.infer<typeof StepThreeFormSchema>) {
    setReservationData({ ...reservation, ...values });
    router.push("?step=4", { scroll: true });
  }

  return (
    <>
      <Card className="w-full bg-card p-8 border-none">
        <Form {...form}>
          <form
            id="step3form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="h-10 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* WhatsApp Number Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    WhatsApp Number
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="10 digit phone number"
                        {...field}
                        className="h-10 text-base"
                        maxLength={10}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    We&apos;ll use this to contact you about your reservation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      {...field}
                      className="h-10 text-base"
                    />
                  </FormControl>
                  <FormDescription>
                    Booking confirmation will be sent to this email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* How did you find us */}
            <FormField
              control={form.control}
              name="findus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    How did you find us?
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="instagram">
                        📱 Instagram / Facebook
                      </SelectItem>
                      <SelectItem value="google">🔍 Google</SelectItem>
                      <SelectItem value="word-of-mouth">
                        💬 Word of Mouth
                      </SelectItem>
                      <SelectItem value="advertisements">
                        📢 Other Advertisements
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Choose Occasion */}
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Choose Occasion
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select an occasion" />
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

            {/* Number of People */}
            <FormField
              control={form.control}
              name="noOfPeople"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Number of People
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of people"
                      {...field}
                      className="h-10 text-base"
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 2, maximum 15 people
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Card>
      <div className="mt-5 z-10">
        <div className="bg-background/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
          <div className="flex gap-4 max-w-md mx-auto">
            <Button
              variant="outline"
              className="flex-1 h-12 bg-transparent"
              onClick={() => {
                router.push("?step=2", { scroll: true });
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              form="step3form"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
