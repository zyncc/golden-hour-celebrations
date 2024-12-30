"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { phoneValidator } from "@/lib/zodSchemas";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function SignInForm() {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof phoneValidator>>({
    resolver: zodResolver(phoneValidator),
    defaultValues: {
      phone: "",
    },
  });
  async function onSubmit({
    phone: phoneNumber,
  }: z.infer<typeof phoneValidator>) {
    setPhone(phoneNumber);
    await authClient.phoneNumber.sendOtp({
      phoneNumber,
      fetchOptions: {
        onRequest: (ctx) => setLoadingSendOtp(true),
        onSuccess: () => {
          setLoadingSendOtp(false);
          setOpen(true);
        },
        onError: (ctx) => {
          setLoadingSendOtp(false);
          toast({
            variant: "destructive",
            title: "Error",
            description: ctx.error.message,
          });
        },
      },
    });
  }
  async function handleOtpSubmit() {
    await authClient.phoneNumber.verify({
      phoneNumber: phone,
      code: otp,
      fetchOptions: {
        onRequest: () => setLoadingVerifyOtp(true),
        onError: (ctx) => {
          setLoadingVerifyOtp(false);
          toast({
            variant: "destructive",
            title: ctx.error.message,
          });
        },
        onSuccess: () => {
          setLoadingVerifyOtp(false);
          router.refresh();
        },
      },
    });
    setOpen(false);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter the OTP sent to your Whatsapp</DialogTitle>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup className={"w-full my-7"}>
                <InputOTPSlot index={0} className={"w-full"} />
                <InputOTPSlot index={1} className={"w-full"} />
                <InputOTPSlot index={2} className={"w-full"} />
                <InputOTPSlot index={3} className={"w-full"} />
                <InputOTPSlot index={4} className={"w-full"} />
                <InputOTPSlot index={5} className={"w-full"} />
              </InputOTPGroup>
            </InputOTP>
            <Button disabled={loadingVerifyOtp} onClick={handleOtpSubmit}>
              {loadingVerifyOtp ? (
                <LoaderCircle className={"animate-spin"} />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Whatsapp Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" type={"text"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loadingSendOtp}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {loadingSendOtp ? "Sending OTP" : "Sign in with OTP"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default SignInForm;
