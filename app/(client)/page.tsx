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
      <section className="h-screen w-screen dark:bg-black dark:bg-grid-white/[0.07] bg-grid-small-black/[0.2] relative flex items-center justify-center bg-fixed">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-fixed"></div>
        <Spotlight className="left-0 hidden lg:block" />
        <div className="flex flex-col text-center lg:text-left w-screen items-center container">
          <p className="goldText text-5xl select-none sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b">
            Golden Hour
          </p>
          <p className="goldText text-5xl select-none sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b">
            Celebrations
          </p>
          <TextGenerateEffect
            className="text-sm"
            filter
            duration={3}
            words="It's Time to Surprise your Loved ones"
          />
        </div>
      </section>
      <section id="about" className="container flex flex-col items-center">
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
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard
                key={review.name}
                body={review.description}
                name={review.name}
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
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
