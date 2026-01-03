"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { useReservation } from "@/context/ReservationStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string({ message: "Phone is required" }).regex(/^[6-9]\d{9}$/, {
    message: "Invalid phone number",
  }),
});

export default function HomePageForm() {
  const router = useRouter();

  const { setReservationData, reservation } = useReservation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: reservation?.name || "",
      phone: reservation?.phone || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setReservationData({
      name: values.name,
      phone: values.phone,
    });
    router.push("/book?step=1");
  }

  return (
    <Card className="bg-transparent backdrop-blur-3xl">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-6 flex flex-col items-start">
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="placeholder:font-normal font-normal"
                      {...field}
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
                <FormItem className="mt-6 flex flex-col items-start">
                  <FormControl>
                    <Input
                      placeholder="Phone"
                      className="placeholder:font-normal font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all text-xs uppercase tracking-[0.2em] font-bold">
              Book Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
