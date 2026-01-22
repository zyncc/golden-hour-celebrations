"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useReservation } from "@/context/ReservationStore";
import {
  cakePrice,
  cakes,
  candleLightRosePath,
  ledLetterLightAge,
  ledLetterLightName,
} from "@/lib/constants";
import formatCurrency from "@/lib/formatCurrency";
import {
  Cake,
  Camera,
  Cloud,
  Eye,
  Flame,
  Heart,
  Info,
  Lightbulb,
  MessageSquare,
  Moon,
  Move3D,
  Scissors,
  Video,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StepTwo() {
  const { reservation, setReservationData } = useReservation();
  if (reservation == undefined) {
    redirect("/book");
  }

  const [selectedCake, setSelectedCake] = useState<string>("");
  const [photographyPackage, setPhotographyPackage] = useState<string | null>(null);
  const [wantsLedLetterLightName, setWantsLedLetterLightName] = useState<boolean>(false);
  const [wantsLedLetterLightAge, setWantsLedLetterLightAge] = useState<boolean>(false);
  const [ledLetterName, setLedLetterName] = useState<string | undefined>();
  const [ledLetterAge, setLedLetterAge] = useState<string | undefined>();
  const [wantsFogEntry, setWantsFogEntry] = useState<boolean>(false);
  const [wantsRosePath, setWantsRosePath] = useState<boolean>(false);
  const router = useRouter();

  function handleNextButton() {
    if (wantsLedLetterLightName && !ledLetterName) {
      toast.error("You have selected Led Letter Light Name", {
        description: "Please provide a name to proceed",
      });
      return;
    }
    if (wantsLedLetterLightAge && !ledLetterAge) {
      toast.error("You have selected Led Letter Light Age", {
        description: "Please provide an age to proceed",
      });
      return;
    }
    router.push("?step=3", {
      scroll: true,
    });
  }

  const CAKE_DATA: Record<string, string> = {
    "Vancho Cake": "/vancho_cake.jpeg",
    "Blueberry Cheese Cake": "/blueberry_cake.jpeg",
    "Choco Truffle Cake": "/choco_cake.jpeg",
    "Rasmalai Cake": "/rasmalai_cake.jpeg",
    "Butter Scotch Crunch": "/butterscotch_cake.jpeg",
    "Black Forest Cake": "/blackforest_cake.jpeg",
  };

  return (
    <div className="min-h-screen">
      <div className="py-6">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="from-foreground to-foreground/70 mb-4 bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent">
            Choose Optional Add-ons
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Enhance your celebration with our premium services. All add-ons are optional
            and can be customized to your preferences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mb-12 grid grid-flow-dense grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Cake Selection */}
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/20">
                  <Cake className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Cake Selection</CardTitle>
                  <CardDescription className="text-sm">
                    All cakes are 500g • Starting from ₹{cakePrice}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Selected Cake Preview */}
              {reservation.cake && CAKE_DATA[reservation.cake] && (
                <div className="border-primary/20 from-primary/5 rounded-2xl border-2 bg-gradient-to-br to-transparent p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{reservation.cake}</h3>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700"
                      >
                        Selected
                      </Badge>
                    </div>
                    <Image
                      src={CAKE_DATA[reservation.cake]}
                      width={200}
                      height={200}
                      alt={reservation.cake}
                      className="aspect-square rounded-xl object-cover shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Cake Selection Button */}
              <Dialog>
                <DialogTrigger
                  render={
                    <Button
                      className="w-full py-6 text-base font-semibold"
                      variant={reservation.cake ? "outline" : "default"}
                    >
                      {reservation.cake ? "Change Cake" : "Select Cake"}
                    </Button>
                  }
                />
                <DialogContent className="flex flex-col gap-0 sm:max-h-[min(640px,80vh)] [&>button:last-child]:top-3.5">
                  <div className="space-y-4 px-6 py-6">
                    <div>
                      <h2 className="text-2xl font-bold">Choose Your Cake</h2>
                      <p className="text-muted-foreground mt-1">
                        All cakes are 500g • Starting from ₹{cakePrice}
                      </p>
                    </div>
                  </div>
                  <div className="grid max-h-[calc(80vh-200px)] grid-cols-2 gap-4 overflow-y-auto px-6 pb-6 sm:grid-cols-3">
                    {cakes.map((cake) => {
                      const imageSrc = CAKE_DATA[cake];
                      if (!imageSrc) return null;
                      return (
                        <DialogClose
                          key={cake}
                          render={
                            <button
                              onClick={() => {
                                setReservationData({
                                  ...reservation,
                                  cake,
                                });
                              }}
                              className="group flex flex-col gap-3 rounded-xl transition-all hover:shadow-lg"
                            >
                              <div className="relative overflow-hidden rounded-xl shadow-sm">
                                {cake === "Vancho Cake" && (
                                  <Badge
                                    variant={"default"}
                                    className="absolute top-2 right-2 z-10 bg-amber-500 font-semibold shadow-lg"
                                  >
                                    Best Seller
                                  </Badge>
                                )}

                                <Image
                                  src={imageSrc || "/placeholder.svg"}
                                  width={200}
                                  height={200}
                                  alt={cake}
                                  className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                                />
                              </div>

                              <div className="space-y-1 text-center">
                                <p className="text-sm leading-tight font-semibold">
                                  {cake}
                                </p>
                                <p className="text-xs font-medium text-emerald-600">
                                  ₹
                                  {cake === "Rasmalai Cake"
                                    ? "800"
                                    : cake === "Blueberry Cheese Cake"
                                      ? "900"
                                      : "550"}
                                </p>
                              </div>
                            </button>
                          }
                        />
                      );
                    })}
                  </div>
                  <div className="border-t px-6 py-4">
                    <DialogClose
                      render={
                        <Button className="w-full" variant={"secondary"}>
                          Cancel
                        </Button>
                      }
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Remove Cake Option */}
              {reservation.cake && (
                <Button
                  onClick={() => {
                    setReservationData({
                      ...reservation,
                      cake: undefined,
                      writingOnCake: undefined,
                    });
                  }}
                  variant="ghost"
                  className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  ✕ Remove Cake Selection
                </Button>
              )}

              {/* Custom Message */}
              {reservation.cake && (
                <div className="space-y-3 rounded-xl p-4">
                  <div>
                    <Label className="text-sm font-semibold">
                      Writing on Cake (Optional)
                    </Label>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Add a personalized message on the cake
                    </p>
                  </div>
                  <Input
                    placeholder="e.g., Happy Birthday Sarah!"
                    defaultValue={reservation?.writingOnCake || undefined}
                    type="text"
                    maxLength={15}
                    className="h-10"
                    onChange={(e) => {
                      setReservationData({
                        ...reservation,
                        writingOnCake: e.target.value,
                      });
                    }}
                  />
                  <p className="text-muted-foreground text-xs">
                    {reservation?.writingOnCake?.length || 0}/15 characters
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground text-sm">
                If you require custom cakes please contact us for assistance
              </p>
            </CardFooter>
          </Card>

          {/* Photography Package */}
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/20">
                    <Camera className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Photography & Video</CardTitle>
                    <CardDescription className="text-sm">
                      Professional coverage of your celebration
                    </CardDescription>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
                    <DialogHeader className="contents space-y-0 text-left">
                      <DialogTitle className="flex items-center gap-2 px-6 py-6">
                        <Camera className="h-5 w-5" />
                        Photoshoot + Video Coverage
                      </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto px-6 pb-6">
                      <div className="space-y-6">
                        <div className="bg-background rounded-lg p-4 text-center">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            <strong>📸 Photoshoot + Video Coverage</strong>
                            <br />
                            At Golden Hour Celebrations, we&apos;re not just capturing
                            visuals — we&apos;re preserving emotions, expressions, and the
                            magic of your moment. Our setup is designed to offer cinematic
                            quality and aesthetic beauty, without compromising on clarity.
                          </p>
                        </div>

                        {/* Equipment Section */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              Professional Equipment
                            </h3>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="rounded-md">
                              <p className="text-muted-foreground mb-2">
                                We use the <strong>Samsung Galaxy S24 Ultra</strong>,
                                paired with the <strong>DJI Osmo Gimbal</strong>, which
                                together offer results comparable to professional DSLR
                                setups. Whether it&apos;s a surprise entry or a heartfelt
                                celebration, our equipment ensures every frame looks
                                beautiful, vibrant, and true to the moment.
                              </p>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Quality Features */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              🌟 What Makes Our Capture Quality Stand Out
                            </h3>
                          </div>
                          <div className="space-y-2 pl-7 text-sm">
                            <div className="grid gap-2">
                              <div className="flex items-start gap-2">
                                <Camera className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                <div>
                                  <p>
                                    <strong>200MP Ultra High-Resolution Camera</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Video className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                                <div>
                                  <p>
                                    <strong>8K Video Recording</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Moon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                                <div>
                                  <p>
                                    <strong>Night Mode</strong> for dreamy, low-light
                                    settings
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                                <div>
                                  <p>
                                    <strong>AI-Enhanced Image Processing</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Move3D className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                                <div>
                                  <p>
                                    <strong>DJI Osmo Gimbal</strong> for smooth, cinematic
                                    movement
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
                            <h3 className="text-lg font-semibold">
                              🎥 ₹1500 Photoshoot + Video Coverage Package
                            </h3>
                          </div>
                          <div className="space-y-2 pl-7 text-sm">
                            <p className="text-muted-foreground mb-3">
                              Package Includes:
                            </p>
                            <div className="grid gap-2">
                              <div className="flex items-start gap-2">
                                <Camera className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                <div>
                                  <p>
                                    <strong>📸 Photoshoot + video shoot</strong> for up to
                                    1 hour
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Video className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                                <div>
                                  <p>
                                    <strong>🎥 Full coverage</strong> of your entry and
                                    celebration moments
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Scissors className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                                <div>
                                  <p>
                                    <strong>✂ One edited highlight video clip</strong> of
                                    upto 1 min (with transitions and music)
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                                <div>
                                  <p>
                                    <strong>
                                      💌 A selection of candid, aesthetic photos
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
                            <h3 className="text-lg font-semibold">
                              💬 See Before You Decide
                            </h3>
                          </div>
                          <div className="pl-7 text-sm">
                            <p className="text-muted-foreground mb-3">
                              We understand how personal and important this decision is.
                              That&apos;s why we&apos;re happy to share real samples of
                              past celebrations — so you can view the photo and video
                              output before choosing to go ahead.
                            </p>
                            <p className="text-muted-foreground">
                              Our aim is to make this experience accessible and
                              meaningful, without ever compromising on quality. If
                              you&apos;d like to preview our work, just let us know —
                              we&apos;d love to share the magic 💛
                            </p>
                          </div>
                        </div>

                        <div className="bg-card rounded-lg p-3 text-center">
                          <p className="text-sm font-medium">
                            Preserving your precious moments with cinematic quality and
                            heartfelt care.
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value: string) => {
                  if (value === "none") {
                    setPhotographyPackage(null);
                    setReservationData({
                      ...reservation,
                      photography: undefined,
                    });
                    return;
                  }
                  setPhotographyPackage(value);
                  setReservationData({
                    ...reservation,
                    photography: value,
                  });
                }}
                defaultValue={reservation.photography || photographyPackage || "none"}
                className="space-y-3"
              >
                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    photographyPackage === "photoshoot" ||
                    reservation.photography === "photoshoot"
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="photoshoot" id="photoshoot" />
                    <div>
                      <div className="font-medium">Photography Only</div>
                      <div className="text-muted-foreground text-sm">
                        Complete celebration coverage
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-emerald-600">+₹700</div>
                  </div>
                </Label>

                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    photographyPackage === "video" || reservation.photography === "video"
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="video" id="video" />
                    <div>
                      <div className="font-medium">Photography & Video</div>
                      <div className="text-muted-foreground text-sm">
                        Photos + videos + edited highlight reel
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-emerald-600">+₹1500</div>
                    <div className="text-muted-foreground text-xs">Most popular</div>
                  </div>
                </Label>

                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    photographyPackage === "none" || reservation.photography === undefined
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="none" id="none" />
                    <div>
                      <div className="font-medium">Skip Photography</div>
                      <div className="text-muted-foreground text-sm">
                        No photography or video coverage
                      </div>
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* LED Letter Lights */}
          <Card className="border-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/20">
                  <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">LED Letter Lights</CardTitle>
                  <CardDescription className="text-sm">
                    Illuminated displays (optional)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={
                  wantsLedLetterLightName || reservation.ledLetterName
                    ? "name"
                    : wantsLedLetterLightAge || reservation.ledLetterAge
                      ? "age"
                      : "none"
                }
                onValueChange={(value) => {
                  if (value === "name") {
                    setWantsLedLetterLightName(true);
                    setWantsLedLetterLightAge(false);
                    setLedLetterAge(undefined);
                    setReservationData({
                      ...reservation,
                      ledLetterAge: undefined,
                    });
                  } else if (value === "age") {
                    setWantsLedLetterLightName(false);
                    setWantsLedLetterLightAge(true);
                    setLedLetterName(undefined);
                    setReservationData({
                      ...reservation,
                      ledLetterName: undefined,
                    });
                  } else {
                    setWantsLedLetterLightName(false);
                    setWantsLedLetterLightAge(false);
                    setLedLetterName(undefined);
                    setLedLetterAge(undefined);
                    setReservationData({
                      ...reservation,
                      ledLetterName: undefined,
                      ledLetterAge: undefined,
                    });
                  }
                }}
                className="space-y-3"
              >
                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    wantsLedLetterLightName || reservation.ledLetterName
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="name" id="led-name" />
                    <div>
                      <div className="font-medium">Name Display</div>
                      <div className="text-muted-foreground text-sm">Up to 7 letters</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-emerald-600">
                      +{formatCurrency(ledLetterLightName)}
                    </div>
                  </div>
                </Label>

                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    wantsLedLetterLightAge || reservation.ledLetterAge
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="age" id="led-age" />
                    <div>
                      <div className="font-medium">Age Display</div>
                      <div className="text-muted-foreground text-sm">Up to 2 digits</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-emerald-600">
                      +{formatCurrency(ledLetterLightAge)}
                    </div>
                  </div>
                </Label>

                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    !wantsLedLetterLightName &&
                    !wantsLedLetterLightAge &&
                    !reservation.ledLetterName &&
                    !reservation.ledLetterAge
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="none" id="led-none" />
                    <div>
                      <div className="font-medium">None</div>
                      <div className="text-muted-foreground text-sm">
                        Skip LED displays
                      </div>
                    </div>
                  </div>
                </Label>
              </RadioGroup>

              {/* Name Input */}
              {(wantsLedLetterLightName || reservation.ledLetterName) && (
                <div className="bg-primary/5 space-y-2 rounded-lg p-4">
                  <Label htmlFor="name-input" className="text-sm font-medium">
                    Enter Name
                  </Label>
                  <Input
                    id="name-input"
                    value={ledLetterName || reservation.ledLetterName || ""}
                    onChange={(e) => {
                      setLedLetterName(e.target.value);
                      setReservationData({
                        ...reservation,
                        ledLetterName: e.target.value,
                      });
                    }}
                    placeholder="Enter name (max 7 letters)"
                    maxLength={7}
                    className="h-11"
                  />
                </div>
              )}

              {/* Age Input */}
              {(wantsLedLetterLightAge || reservation.ledLetterAge) && (
                <div className="bg-primary/5 space-y-2 rounded-lg p-4">
                  <Label htmlFor="age-input" className="text-sm font-medium">
                    Enter Age
                  </Label>
                  <Input
                    id="age-input"
                    value={ledLetterAge || reservation.ledLetterAge || ""}
                    onChange={(e) => {
                      setLedLetterAge(e.target.value);
                      setReservationData({
                        ...reservation,
                        ledLetterAge: e.target.value,
                      });
                    }}
                    placeholder="Enter age (max 2 digits)"
                    maxLength={2}
                    className="h-11"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Image
                src={"/LED LETTER.jpg"}
                width={300}
                height={200}
                className="rounded-lg"
                alt="LED LETTER"
              />
            </CardFooter>
          </Card>

          {/* Display Name */}
          <Card className="border-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/20">
                  <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Display Name</CardTitle>
                  <CardDescription className="text-sm">
                    Name or age for general display [Free]
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., Sarah, 25"
                defaultValue={reservation?.nameToDisplay || undefined}
                type="text"
                maxLength={8}
                className="h-11"
                onChange={(e) => {
                  setReservationData({
                    ...reservation,
                    nameToDisplay: e.target.value,
                  });
                }}
              />
              <p className="text-muted-foreground mt-2 text-xs">Maximum 8 characters</p>
            </CardContent>
            <CardFooter>
              <Image
                src={"/DISPLAY NAME.jpg"}
                width={300}
                height={200}
                className="rounded-lg"
                alt="DISPLAY NAME"
              />
            </CardFooter>
          </Card>

          {/* Fog Entry */}
          <Card className="border-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-900/20">
                  <Cloud className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Fog Entry Effect</CardTitle>
                  <CardDescription className="text-sm">
                    Grand entrance enhancement (optional)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={reservation.fogEntry || wantsFogEntry ? "yes" : "no"}
                onValueChange={(value) => {
                  const isSelected = value === "yes";
                  setWantsFogEntry(isSelected);
                  setReservationData({
                    ...reservation,
                    fogEntry: isSelected,
                  });
                }}
                className="space-y-3"
              >
                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    reservation.fogEntry || wantsFogEntry
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="fog-yes" />
                    <div>
                      <div className="font-medium">Add Fog Effect</div>
                      <div className="text-muted-foreground text-sm">
                        Mesmerizing fog for your grand entrance
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-emerald-600">+₹400</div>
                  </div>
                </Label>

                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    !reservation.fogEntry && !wantsFogEntry
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="fog-no" />
                    <div>
                      <div className="font-medium">Skip Fog Effect</div>
                      <div className="text-muted-foreground text-sm">
                        Continue without fog
                      </div>
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Image
                src={"/FOG ENTRY.jpg"}
                width={300}
                height={200}
                className="aspect-1 rounded-lg object-cover"
                alt="FOG ENTRY"
              />
            </CardFooter>
          </Card>

          {/* Rose Path */}
          <Card className="border-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-rose-100 p-2 dark:bg-rose-900/20">
                  <Flame className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Candlelight Rose Path</CardTitle>
                  <CardDescription className="text-sm">
                    Elegant pathway enhancement (optional)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={reservation.rosePath || wantsRosePath ? "yes" : "no"}
                onValueChange={(value) => {
                  const isSelected = value === "yes";
                  setWantsRosePath(isSelected);
                  setReservationData({
                    ...reservation,
                    rosePath: isSelected,
                  });
                }}
                className="space-y-3"
              >
                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    reservation.rosePath || wantsRosePath
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="rose-yes" />
                    <div>
                      <div className="font-medium">Add Rose Path</div>
                      <div className="text-muted-foreground text-sm">
                        Elegant candlelit pathway
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-emerald-600">
                      +{formatCurrency(candleLightRosePath)}
                    </div>
                  </div>
                </Label>

                <Label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    !reservation.rosePath && !wantsRosePath
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="rose-no" />
                    <div>
                      <div className="font-medium">Skip Rose Path</div>
                      <div className="text-muted-foreground text-sm">
                        Continue without pathway
                      </div>
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Image
                src={"/ROSE PATH.jpg"}
                width={300}
                height={200}
                className="aspect-1 rounded-lg object-cover object-top"
                alt="ROSE PATH"
              />
            </CardFooter>
          </Card>

          {/* Special Requests */}
          <Card className="border-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/20">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Special Requests</CardTitle>
                  <CardDescription className="text-sm">
                    Any additional requirements or preferences (optional)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                defaultValue={reservation?.specialRequests || undefined}
                className="min-h-[100px] resize-none"
                maxLength={200}
                onChange={(e) => {
                  setReservationData({
                    ...reservation,
                    specialRequests: e.target.value,
                  });
                }}
              />
              <p className="text-muted-foreground mt-2 text-xs">Maximum 200 characters</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-6 z-10">
          <div className="bg-background/80 rounded-2xl p-4 shadow-lg backdrop-blur-lg">
            <div className="mx-auto flex max-w-md gap-4">
              <Button
                variant="outline"
                className="h-12 flex-1 bg-transparent"
                onClick={() => {
                  router.push("?step=1", { scroll: true });
                }}
              >
                Back
              </Button>
              <Button
                className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 flex-1 bg-linear-to-r"
                onClick={handleNextButton}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
