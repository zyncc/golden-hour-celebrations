"use client";

import { Button } from "@/components/ui/button";
import { useReservation } from "@/context/ReservationStore";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cakes } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";

export default function StepTwo() {
  const { reservation, setReservationData } = useReservation();
  if (reservation == undefined) {
    redirect("/book");
  }

  const [selectedCake, setSelectedCake] = useState<string | null>(null);
  const [photographyPackage, setPhotographyPackage] = useState<string | null>(
    null
  );
  const [wantsFogEntry, setWantsFogEntry] = useState<boolean>(false);
  const [wantsRosePath, setWantsRosePath] = useState<boolean>(false);
  const router = useRouter();

  function handleNextButton() {
    router.push("?step=4", {
      scroll: true,
    });
  }

  return (
    <div className={"mt-10 mb-24 w-full flex flex-col"}>
      <div>
        <h1 className="text-3xl font-bold mb-4">Choose Optional Addons</h1>
        <p className="mb-6 text-muted-foreground">
          These Addon&apos;s are optional and can be skipped.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="w-full row-span-2">
            <CardHeader>
              <CardTitle>Cake Selection</CardTitle>
              <CardDescription>
                All cakes cost ₹500 and weigh 500 grams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value: string) => {
                  setSelectedCake(value);
                  setReservationData({
                    ...reservation,
                    cake: value,
                  });
                }}
                defaultValue={reservation.cake || selectedCake || undefined}
                className="gap-3"
              >
                {cakes.map((cake) => (
                  <Label
                    key={cake}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedCake === cake
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    htmlFor={cake}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={cake} id={cake} />
                        <span className="font-medium">{cake}</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        500 grams
                      </p>
                    </div>
                    <span className="text-sm font-medium text-green-500">
                      + ₹500
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Professional Photography Services</CardTitle>
              <CardDescription>Capture your special moments</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value: string) => {
                  setPhotographyPackage(value);
                  setReservationData({
                    ...reservation,
                    photography: value,
                  });
                }}
                defaultValue={
                  reservation.photography || photographyPackage || undefined
                }
                className="gap-3"
              >
                <Label
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                    photographyPackage === "30"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30" id="30min" />
                      <span className="font-medium">30 Minutes Package</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Professional Photo Shoot
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    + ₹700
                  </span>
                </Label>
                <Label
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                    photographyPackage === "60"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="60" id="60min" />
                      <span className="font-medium">60 Minutes Package</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Extended coverage with more shots
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    + ₹1000
                  </span>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card className="w-full h-fit">
            <CardHeader>
              <CardTitle>Fog Entry </CardTitle>
              <CardDescription className="flex justify-between">
                <p>
                  Enhance your grand entrance with a mesmerizing fog effect{" "}
                  <span className="text-green-500">(₹400)</span>
                </p>
                <Switch
                  checked={reservation.fogEntry || wantsFogEntry}
                  onCheckedChange={(value) => {
                    setWantsFogEntry(value);
                    setReservationData({
                      ...reservation,
                      fogEntry: value,
                    });
                  }}
                />
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Candle Light Rose Path</CardTitle>
              <CardDescription className="flex justify-between">
                <p>
                  Add a touch of elegance with a candlelit path{" "}
                  <span className="text-green-500">(₹400)</span>
                </p>
                <Switch
                  checked={reservation.rosePath || wantsRosePath}
                  onCheckedChange={(value) => {
                    setWantsRosePath(value);
                    setReservationData({
                      ...reservation,
                      rosePath: value,
                    });
                  }}
                />
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="sticky bottom-0 w-full bg-black pt-4 pb-4 z-10">
        <div className="flex gap-4">
          <Button
            type={"submit"}
            className={"flex-1"}
            variant={"outline"}
            onClick={() => {
              router.push("?step=2", {
                scroll: true,
              });
            }}
          >
            Back
          </Button>
          <Button
            type={"submit"}
            className={"flex-1 bg-yellow-500 hover:bg-yellow-500"}
            variant={"default"}
            onClick={() => handleNextButton()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
