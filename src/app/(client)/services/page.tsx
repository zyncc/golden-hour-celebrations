import { Metadata } from "next";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Gift,
  BellRingIcon as Ring,
  Heart,
  Trophy,
  Cake,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen mt-8 bg-background text-foreground dark:text-gray-100">
      <div className="container mx-auto px-4 py-16 space-y-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Golden Hour Celebrations</h1>
          <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            Your one-stop destination for private theatre celebrations and
            unforgettable moments.
          </p>
        </div>
        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Why Choose Us?
          </h2>
          <Card className="dark:bg-[#09090b] dark:border-neutral-700">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed text-muted-foreground dark:text-gray-300">
                At Golden Hour Celebrations, we specialize in making your loved
                ones&apos; special day truly memorable. Whether it&apos;s a
                birthday, anniversary, baby shower, or just a moment to
                celebrate, we provide personalized decorations and a private
                theatre experience exclusively for you.
              </p>
            </CardContent>
          </Card>
        </section>
        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Occasions We Cater To
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={
                <Cake className="w-8 h-8 text-primary dark:text-gray-300" />
              }
              title="Birthdays"
              description="Make your birthday extra special with a private theatre celebration."
            />
            <ServiceCard
              icon={
                <Calendar className="w-8 h-8 text-primary dark:text-gray-300" />
              }
              title="Anniversaries"
              description="Celebrate your love story in a unique and memorable way."
            />
            <ServiceCard
              icon={
                <Ring className="w-8 h-8 text-primary dark:text-gray-300" />
              }
              title="Bride/Groom-to-Be"
              description="Perfect for pre-wedding celebrations and special moments."
            />
            <ServiceCard
              icon={
                <Gift className="w-8 h-8 text-primary dark:text-gray-300" />
              }
              title="Baby Showers"
              description="Welcome your little one with a spectacular celebration."
            />
            <ServiceCard
              icon={
                <Heart className="w-8 h-8 text-primary dark:text-gray-300" />
              }
              title="Valentine's Day"
              description="Create romantic memories in a private theatre setting."
            />
            <ServiceCard
              icon={
                <Trophy className="w-8 h-8 text-primary dark:text-gray-300" />
              }
              title="Achievements"
              description="Celebrate your milestones with an unforgettable experience."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-transform hover:scale-105 dark:bg-[#09090b] dark:border-neutral-700">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground dark:text-gray-300">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
