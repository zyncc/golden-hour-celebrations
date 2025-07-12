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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Camera,
  Eye,
  Heart,
  IndianRupee,
  Moon,
  Move3D,
  Scissors,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
              <CardTitle className="flex items-center gap-x-2">
                Photo and Video Shoot{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      More Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
                    <ScrollArea className="flex max-h-full flex-col overflow-hidden">
                      <DialogHeader className="contents space-y-0 text-left">
                        <DialogTitle className="px-6 pt-6 flex items-center gap-2">
                          <Camera className="w-5 h-5" />
                          Photoshoot + Video Coverage
                        </DialogTitle>
                        <DialogDescription asChild>
                          <div className="p-6">
                            <div className="space-y-6">
                              {/* Introduction */}
                              <div className="text-center p-4 bg-background rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  <strong>
                                    📸✨ Photoshoot + Video Coverage
                                  </strong>
                                  <br />
                                  At Golden Hour Celebrations, we&apos;re not
                                  just capturing visuals — we&apos;re preserving
                                  emotions, expressions, and the magic of your
                                  moment. Our setup is designed to offer
                                  cinematic quality and aesthetic beauty,
                                  without compromising on clarity.
                                </p>
                              </div>

                              {/* Equipment Section */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">
                                    Professional Equipment
                                  </h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="rounded-md">
                                    <p className="mb-2 text-muted-foreground">
                                      We use the{" "}
                                      <strong>Samsung Galaxy S24 Ultra</strong>,
                                      paired with the{" "}
                                      <strong>DJI Osmo Gimbal</strong>, which
                                      together offer results comparable to
                                      professional DSLR setups. Whether
                                      it&apos;s a surprise entry or a heartfelt
                                      celebration, our equipment ensures every
                                      frame looks beautiful, vibrant, and true
                                      to the moment.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Quality Features */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">
                                    🌟 What Makes Our Capture Quality Stand Out
                                  </h3>
                                </div>
                                <div className="pl-7 space-y-2 text-sm">
                                  <div className="grid gap-2">
                                    <div className="flex items-start gap-2">
                                      <Camera className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>
                                            200MP Ultra High-Resolution Camera
                                          </strong>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Video className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>8K Video Recording</strong>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Moon className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>Night Mode</strong> for
                                          dreamy, low-light settings
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Zap className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>
                                            AI-Enhanced Image Processing
                                          </strong>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Move3D className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>DJI Osmo Gimbal</strong> for
                                          smooth, cinematic movement
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Package Details */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">
                                    🎥 ₹1500 Photoshoot + Video Coverage Package
                                  </h3>
                                </div>
                                <div className="pl-7 space-y-2 text-sm">
                                  <p className="text-muted-foreground mb-3">
                                    Package Includes:
                                  </p>
                                  <div className="grid gap-2">
                                    <div className="flex items-start gap-2">
                                      <Camera className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>
                                            📸 Photoshoot + video shoot
                                          </strong>{" "}
                                          for up to 1 hour
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Video className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>🎥 Full coverage</strong> of
                                          your entry and celebration moments
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Scissors className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>
                                            ✂ One edited highlight video clip
                                          </strong>{" "}
                                          of upto 1 min (with transitions and
                                          music)
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p>
                                          <strong>
                                            💌 A selection of candid, aesthetic
                                            photos
                                          </strong>{" "}
                                          from your event
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Sample Viewing */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">
                                    💬 See Before You Decide
                                  </h3>
                                </div>
                                <div className="pl-7 text-sm">
                                  <p className="mb-3 text-muted-foreground">
                                    We understand how personal and important
                                    this decision is. That&apos;s why we&apos;re
                                    happy to share real samples of past
                                    celebrations — so you can view the photo and
                                    video output before choosing to go ahead.
                                  </p>
                                  <p className="text-muted-foreground">
                                    Our aim is to make this experience
                                    accessible and meaningful, without ever
                                    compromising on quality. If you&apos;d like
                                    to preview our work, just let us know —
                                    we&apos;d love to share the magic 💛
                                  </p>
                                </div>
                              </div>

                              <div className="text-center p-3 bg-card rounded-lg">
                                <p className="text-sm font-medium">
                                  Preserving your precious moments with
                                  cinematic quality and heartfelt care.
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardTitle>
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
