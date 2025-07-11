import { Footer } from "@/components/footer/footer";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import React from "react";
import { reviews } from "@/lib/constants";
import { FAQSection } from "@/components/faqs/faq";
import { Metadata } from "next";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export const metadata: Metadata = {
  title: "The Best Private Theatre in Bangalore - Golden Hour Celebrations",
};

const ReviewCard = ({ name, body }: { name: string; body: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Page() {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <>
      <section className="min-h-screen">
        <BackgroundGradientAnimation interactive={false}>
          <div className="absolute z-50 inset-0 flex-col flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
              Golden Hour
            </p>
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
              Celebrations
            </p>
          </div>
        </BackgroundGradientAnimation>
      </section>
      <section
        id="about"
        className="container mt-10 flex flex-col items-center"
      >
        <h1 className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-4xl text-center lg:text-7xl">
          About us
        </h1>
        <p className="text-center mt-5 max-w-[900px]">
          We at Golden Hour Celebrations plan your loved ones special day with
          personalised decorations exclusively in a private theatre. Celebrate
          birthdays, anniversaries, bride / groom-to-be, baby showers, valentine
          day, celebrate your achievements with us.
        </p>
      </section>

      <section className="container my-[200px]">
        <FAQSection />
      </section>
      <section className="container my-[200px]">
        <h1 className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-4xl text-center lg:text-7xl">
          Testimonials
        </h1>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard
                key={review.name}
                body={review.description}
                name={review.name}
              />
            ))}
          </Marquee>
          <Marquee reverse className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard
                key={review.name}
                body={review.description}
                name={review.name}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </section>
      <Footer />
    </>
  );
}
