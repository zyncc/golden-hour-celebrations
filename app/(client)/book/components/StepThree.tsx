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
import { cakePrice, cakes } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
        <div className="grid grid-cols-1 h-fit lg:grid-cols-2 gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Cake Selection</CardTitle>
              <CardDescription>
                All cakes cost ₹{cakePrice} and weigh 500 grams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(value: string) => {
                  setSelectedCake(value);
                  setReservationData({
                    ...reservation,
                    cake: value,
                  });
                }}
                defaultValue={reservation.cake || selectedCake || undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a cake" />
                </SelectTrigger>
                <SelectContent>
                  {cakes.map((cake) => (
                    <SelectItem key={cake} value={cake}>
                      <span className="font-medium">{cake} </span>
                      <span className="text-sm font-medium text-green-500">
                        ₹
                        {cake == "Red velvet"
                          ? 620
                          : cake == "Rasmalai"
                          ? 620
                          : cakePrice}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-col gap-y-3 mt-5">
                <Input
                  placeholder="Writing on Cake"
                  disabled={!reservation.cake}
                  defaultValue={reservation?.writingOnCake || undefined}
                  type="text"
                  maxLength={15}
                  name="writingOnCake"
                  onChange={(e) => {
                    setReservationData({
                      ...reservation,
                      writingOnCake: e.target.value,
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Photo and Video Shoot</CardTitle>
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
                    photographyPackage === "photoshoot"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="photoshoot" id="photoshoot" />
                      <span className="font-medium">Photoshoot</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Complete Celebration Coverage
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-500 whitespace-nowrap">
                    + ₹700
                  </span>
                </Label>
                <Label
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                    photographyPackage === "video"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <span className="font-medium">Photography & Video</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Photo Shoot & Video Shoot with Edited Video Clip
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-500 whitespace-nowrap">
                    + ₹1500
                  </span>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card className="w-full h-fit">
            <CardHeader>
              <CardDescription>
                Name / Age for display (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-3">
                <Input
                  placeholder="Type here"
                  defaultValue={reservation?.nameToDisplay || undefined}
                  type="text"
                  name="nameToDisplay"
                  maxLength={6}
                  onChange={(e) => {
                    setReservationData({
                      ...reservation,
                      nameToDisplay: e.target.value,
                    });
                  }}
                />
              </div>
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
          <Card className="w-full p-0">
            <CardHeader>
              <CardTitle className="text-base">
                Special Requests (optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type here"
                defaultValue={reservation?.specialRequests || undefined}
                name="specialRequests"
                className="resize-none"
                maxLength={200}
                onChange={(e) => {
                  setReservationData({
                    ...reservation,
                    specialRequests: e.target.value,
                  });
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="sticky bottom-0 w-full  pt-4 pb-4 z-10">
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
            className={"flex-1 bg-highlight hover:bg-highlight-foreground"}
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
