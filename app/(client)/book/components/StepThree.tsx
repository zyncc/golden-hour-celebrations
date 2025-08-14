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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  cakePrice,
  cakes,
  candleLightRosePath,
  ledLetterLightAge,
  ledLetterLightName,
} from "@/lib/constants";
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
  Moon,
  Move3D,
  Scissors,
  Sparkles,
  Video,
  Zap,
  Info,
  Cake,
  Lightbulb,
  Cloud,
  Flame,
  MessageSquare,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import formatCurrency from "@/lib/formatCurrency";
import { toast } from "sonner";
import Image from "next/image";

export default function StepThree() {
  const { reservation, setReservationData } = useReservation();
  if (reservation == undefined) {
    redirect("/book");
  }

  const [selectedCake, setSelectedCake] = useState<string>("");
  const [photographyPackage, setPhotographyPackage] = useState<string | null>(
    null
  );
  const [wantsLedLetterLightName, setWantsLedLetterLightName] =
    useState<boolean>(false);
  const [wantsLedLetterLightAge, setWantsLedLetterLightAge] =
    useState<boolean>(false);
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
    router.push("?step=4", {
      scroll: true,
    });
  }

  return (
    <div className="min-h-screen">
      <div className="py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Choose Optional Add-ons
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enhance your celebration with our premium services. All add-ons are
            optional and can be customized to your preferences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Cake Selection */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Cake className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Cake Selection</CardTitle>
                  <CardDescription className="text-sm">
                    All cakes are 500g • Starting from ₹{cakePrice}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                onValueChange={(value: string) => {
                  setSelectedCake(value);
                  setReservationData({
                    ...reservation,
                    cake: value,
                  });
                }}
                value={selectedCake || reservation.cake || ""}
              >
                <SelectTrigger
                  value={selectedCake || reservation.cake || ""}
                  onReset={() => {
                    setSelectedCake("");
                    setReservationData({
                      ...reservation,
                      cake: undefined,
                    });
                  }}
                  className="w-full"
                >
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

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Custom Message (Optional)
                </Label>
                <Input
                  placeholder="e.g., Happy Birthday Sarah!"
                  disabled={!reservation.cake}
                  defaultValue={reservation?.writingOnCake || undefined}
                  type="text"
                  maxLength={15}
                  className="h-11"
                  onChange={(e) => {
                    setReservationData({
                      ...reservation,
                      writingOnCake: e.target.value,
                    });
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum 15 characters
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground text-sm">
                If you require custom cakes please contact us for assistance
              </p>
            </CardFooter>
          </Card>

          {/* Photography Package */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Photography & Video
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Professional coverage of your celebration
                    </CardDescription>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Info className="w-4 h-4" />
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
                              <div className="text-center p-4 bg-background rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  <strong>
                                    📸 Photoshoot + Video Coverage
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
              </div>
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
                className="space-y-3"
              >
                <Label
                  className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    photographyPackage === "photoshoot"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="photoshoot" id="photoshoot" />
                    <div>
                      <div className="font-medium">Photography Only</div>
                      <div className="text-sm text-muted-foreground">
                        Complete celebration coverage
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-emerald-600">
                      +₹700
                    </div>
                  </div>
                </Label>

                <Label
                  className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    photographyPackage === "video"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="video" id="video" />
                    <div>
                      <div className="font-medium">Photography & Video</div>
                      <div className="text-sm text-muted-foreground">
                        Photos + videos + edited highlight reel
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-emerald-600">
                      +₹1500
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Most popular
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* LED Letter Lights */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">LED Letter Lights</CardTitle>
                  <CardDescription className="text-sm">
                    Illuminated name and age displays
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Name Display</Label>
                    <p className="text-xs text-muted-foreground">
                      Up to 7 letters •{" "}
                      <span className="text-green-500">
                        {formatCurrency(ledLetterLightName)}
                      </span>
                    </p>
                  </div>
                  <Switch
                    checked={
                      !!reservation.ledLetterName || wantsLedLetterLightName
                    }
                    onCheckedChange={(e) => {
                      setWantsLedLetterLightName(e);
                      setLedLetterName(undefined);
                      setReservationData({
                        ...reservation,
                        ledLetterName: undefined,
                      });
                    }}
                  />
                </div>
                <Input
                  value={ledLetterName || reservation.ledLetterName}
                  onChange={(e) => {
                    setLedLetterName(e.target.value);
                    setReservationData({
                      ...reservation,
                      ledLetterName: e.target.value,
                    });
                  }}
                  placeholder="Enter name"
                  maxLength={7}
                  className="h-11"
                  disabled={
                    !wantsLedLetterLightName && !reservation.ledLetterName
                  }
                />
              </div>
              <Separator />
              {/* Age Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Age Display</Label>
                    <p className="text-xs text-green-500">
                      {formatCurrency(ledLetterLightAge)}
                    </p>
                  </div>
                  <Switch
                    checked={
                      wantsLedLetterLightAge || !!reservation.ledLetterAge
                    }
                    onCheckedChange={(e) => {
                      setWantsLedLetterLightAge(e);
                      setLedLetterAge(undefined);
                      setReservationData({
                        ...reservation,
                        ledLetterAge: undefined,
                      });
                    }}
                  />
                </div>
                <Input
                  value={reservation.ledLetterAge || ledLetterAge}
                  onChange={(e) => {
                    setLedLetterAge(e.target.value);
                    setReservationData({
                      ...reservation,
                      ledLetterAge: e.target.value,
                    });
                  }}
                  placeholder="Enter age"
                  maxLength={2}
                  className="h-11"
                  disabled={
                    !wantsLedLetterLightAge && !reservation.ledLetterAge
                  }
                />
              </div>
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
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
              <p className="text-xs text-muted-foreground mt-2">
                Maximum 8 characters
              </p>
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
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-900/20 rounded-lg">
                    <Cloud className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Fog Entry Effect</CardTitle>
                    <CardDescription className="text-sm">
                      Mesmerizing fog for your grand entrance •{" "}
                      <span className="text-emerald-600 font-semibold">
                        ₹400
                      </span>
                    </CardDescription>
                  </div>
                </div>
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
              </div>
            </CardHeader>
            <CardFooter>
              <Image
                src={"/FOG ENTRY.jpg"}
                width={300}
                height={200}
                className="rounded-lg aspect-1 object-cover"
                alt="FOG ENTRY"
              />
            </CardFooter>
          </Card>

          {/* Rose Path */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg">
                    <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Candlelight Rose Path
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Elegant candlelit pathway •{" "}
                      <span className="text-emerald-600 font-semibold">
                        {formatCurrency(candleLightRosePath)}
                      </span>
                    </CardDescription>
                  </div>
                </div>
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
              </div>
            </CardHeader>
            <CardFooter>
              <Image
                src={"/ROSE PATH.jpg"}
                width={300}
                height={200}
                className="rounded-lg aspect-1 object-cover object-top"
                alt="ROSE PATH"
              />
            </CardFooter>
          </Card>

          {/* Special Requests */}
          <Card className="lg:col-span-2 group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
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
              <p className="text-xs text-muted-foreground mt-2">
                Maximum 200 characters
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-6 z-10">
          <div className="bg-background/80 backdrop-blur-lg border rounded-2xl p-4 shadow-lg">
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
                className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                onClick={handleNextButton}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
