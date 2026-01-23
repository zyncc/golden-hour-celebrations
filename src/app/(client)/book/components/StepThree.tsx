"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReservation } from "@/context/ReservationStore";
import { getStepThreeFormSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function StepThreeForm() {
  const { reservation, setReservationData } = useReservation();
  const router = useRouter();

  if (!reservation) {
    redirect("/book");
  }

  const StepThreeFormSchema = getStepThreeFormSchema(reservation.room!);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof StepThreeFormSchema>>({
    resolver: zodResolver(StepThreeFormSchema),
    defaultValues: {
      name: reservation.name || "",
      phone: reservation.phone || "",
      email: reservation.email || "",
      findus: reservation.findus || "",
      occasion: reservation.occasion || "",
      noOfPeople: reservation.noOfPeople,
    },
  });

  function onStepThreeSubmit(values: z.infer<typeof StepThreeFormSchema>) {
    const { success, error } = StepThreeFormSchema.safeParse(values);
    if (!success) {
      toast.error(error.message);
      return;
    }

    setReservationData({ ...reservation, ...values });
    router.push("?step=4", { scroll: true });
  }

  return (
    <>
      <Card className="bg-card w-full border-none p-8">
        <form
          id="step3form"
          onSubmit={handleSubmit(onStepThreeSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            {/* Name Field */}
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="Enter your full name"
                  {...register("name")}
                  className="text-base"
                  data-invalid={!!errors.name}
                />
                <FieldError errors={errors.name ? [errors.name] : undefined} />
              </FieldContent>
            </Field>

            {/* WhatsApp Number Field */}
            <Field>
              <FieldLabel>WhatsApp Number</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="10 digit phone number"
                  {...register("phone")}
                  className="text-base"
                  maxLength={10}
                  data-invalid={!!errors.phone}
                />
                <FieldDescription>
                  We&apos;ll use this to contact you about your reservation
                </FieldDescription>
                <FieldError errors={errors.phone ? [errors.phone] : undefined} />
              </FieldContent>
            </Field>

            {/* Email Field */}
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="your.email@example.com"
                  {...register("email")}
                  className="text-base"
                  data-invalid={!!errors.email}
                />
                <FieldDescription>
                  Booking confirmation will be sent to this email
                </FieldDescription>
                <FieldError errors={errors.email ? [errors.email] : undefined} />
              </FieldContent>
            </Field>

            {/* How did you find us */}
            <Field>
              <FieldLabel>How did you find us?</FieldLabel>
              <FieldContent>
                <Controller
                  name="findus"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full" data-invalid={!!errors.findus}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">
                            📱 Instagram / Facebook
                          </SelectItem>
                          <SelectItem value="google">🔍 Google</SelectItem>
                          <SelectItem value="word-of-mouth">💬 Word of Mouth</SelectItem>
                          <SelectItem value="advertisements">
                            📢 Other Advertisements
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError errors={errors.findus ? [errors.findus] : undefined} />
                    </>
                  )}
                />
              </FieldContent>
            </Field>

            {/* Choose Occasion */}
            <Field>
              <FieldLabel>Choose Occasion</FieldLabel>
              <FieldContent>
                <Controller
                  name="occasion"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className="w-full"
                          data-invalid={!!errors.occasion}
                        >
                          <SelectValue placeholder="Select an occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Birthday">🎂 Birthday</SelectItem>
                          <SelectItem value="Anniversary">💕 Anniversary</SelectItem>
                          <SelectItem value="Bride to be">👰 Bride to be</SelectItem>
                          <SelectItem value="Groom to be">🤵 Groom to be</SelectItem>
                          <SelectItem value="Movie Date">🎬 Movie Date</SelectItem>
                          <SelectItem value="Graduation Party">
                            🎓 Graduation Party
                          </SelectItem>
                          <SelectItem value="Proposal">💍 Proposal</SelectItem>
                          <SelectItem value="Mom to be">🤱 Mom to be</SelectItem>
                          <SelectItem value="Other">🎉 Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError
                        errors={errors.occasion ? [errors.occasion] : undefined}
                      />
                    </>
                  )}
                />
              </FieldContent>
            </Field>

            {/* Number of People */}
            {reservation.room === "Elite Theatre" ? (
              <Field>
                <FieldLabel>Number of People</FieldLabel>
                <FieldContent>
                  <Input
                    type="number"
                    placeholder="Enter number of people"
                    {...register("noOfPeople", { valueAsNumber: true })}
                    className="text-base"
                    data-invalid={!!errors.noOfPeople}
                  />
                  <FieldDescription>Minimum 2, maximum 10 people</FieldDescription>
                  <FieldError
                    errors={errors.noOfPeople ? [errors.noOfPeople] : undefined}
                  />
                </FieldContent>
              </Field>
            ) : (
              <Field>
                <FieldLabel>Number of People</FieldLabel>
                <FieldContent>
                  <Input
                    type="number"
                    placeholder="Enter number of people"
                    {...register("noOfPeople", { valueAsNumber: true })}
                    className="text-base"
                    data-invalid={!!errors.noOfPeople}
                  />
                  <FieldDescription>Minimum 2, maximum 4 people</FieldDescription>
                  <FieldError
                    errors={errors.noOfPeople ? [errors.noOfPeople] : undefined}
                  />
                </FieldContent>
              </Field>
            )}
          </FieldGroup>
        </form>
      </Card>
      <div className="z-10 mt-5">
        <div className="bg-background/80 rounded-2xl p-4 shadow-lg backdrop-blur-lg">
          <div className="mx-auto flex max-w-md gap-4">
            <Button
              variant="outline"
              className="h-12 flex-1 bg-transparent"
              onClick={() => {
                router.push("?step=2", { scroll: true });
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 flex-1 bg-linear-to-r"
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
