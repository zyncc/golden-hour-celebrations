"use client";

import { Button } from "@/components/ui/button";
import { useReservation } from "@/context/ReservationStore";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
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
import { useToast } from "@/components/ui/use-toast";

export default function StepTwo() {
  const { reservation, setReservationData } = useReservation();
  const { toast } = useToast();
  if (reservation == undefined) {
    redirect("/book");
  }

  const [wantsCake, setWantsCake] = useState(false);
  const [selectedCake, setSelectedCake] = useState<string | null>(null);
  const [wantsPhotography, setWantsPhotography] = useState(false);
  const [photographyPackage, setPhotographyPackage] = useState<string | null>(
    null
  );
  const router = useRouter();

  function handleNextButton() {
    if (wantsCake && selectedCake == null) {
      toast({
        title: "Select a cake",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    if (wantsPhotography && photographyPackage == null) {
      toast({
        title: "Select a photography package",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    router.push("?step=4", {
      scroll: true,
    });
  }

  return (
    <div className={"mt-10 mb-24 w-full flex flex-col"}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Choose Optional Addons</h1>
        <p className="mb-6 text-muted-foreground">
          These Addon&apos;s is optional and can be skipped.
        </p>
        <p className="mb-8 text-muted-foreground">
          Elevate your event experience by selecting from our exclusive add-ons.
          Whether it&apos;s decorations, food, or entertainment, we have
          everything you need to make your event unforgettable.
        </p>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Cake Selection</CardTitle>
              <CardDescription>
                All cakes cost 400 rupees and weigh 500 grams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="cake-switch"
                  checked={reservation.cake !== undefined || wantsCake}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setWantsCake(true);
                    } else {
                      setWantsCake(false);
                      setSelectedCake(null);
                      setReservationData({
                        ...reservation,
                        cake: undefined,
                      });
                    }
                  }}
                />
                <Label htmlFor="cake-switch">Add cake to your event</Label>
              </div>
              {(wantsCake || reservation.cake) && (
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
                        + ₹400
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Professional Photography Services</CardTitle>
              <CardDescription>Capture your special moments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="photography-switch"
                  checked={
                    reservation.photography !== undefined || wantsPhotography
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setWantsPhotography(true);
                    } else {
                      setWantsPhotography(false);
                      setPhotographyPackage(null);
                      setReservationData({
                        ...reservation,
                        photography: undefined,
                      });
                    }
                  }}
                />

                <Label htmlFor="photography-switch">
                  Add photography services
                </Label>
              </div>
              {(wantsPhotography || reservation.photography) && (
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
                    htmlFor="30min"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30" id="30min" />
                        <span className="font-medium">30 Minutes Package</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        Professional event photography
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
                    htmlFor="60min"
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
              )}
            </CardContent>
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
