import { Footer } from "@/components/footer/footer";
import React from "react";
import { reviews } from "@/lib/constants";
import { FAQSection } from "@/components/faqs/faq";
import { Metadata } from "next";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export const metadata: Metadata = {
  title: "The Best Private Theatre in Bangalore - Golden Hour Celebrations",
};

export default function Page() {
  return (
    <>
      <section className="min-h-screen">
        <BackgroundGradientAnimation interactive={false}>
          <div className="absolute z-10 inset-0 flex-col flex items-center justify-center text-white font-bold px-4 pointer-events-none text-5xl text-center md:text-6xl lg:text-7xl">
            <p className="bg-clip-text whitespace-nowrap text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
              Golden Hour
            </p>
            <p className="bg-clip-text whitespace-nowrap text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
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
      <section id="reviews" className="container py-[100px]">
        <h1 className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-4xl text-center lg:text-7xl">
          Reviews
        </h1>
        <div className="relative flex w-full flex-col items-center mt-10 justify-center overflow-hidden">
          <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
          <InfiniteMovingCards items={reviews} direction="left" speed="slow" />
        </div>
      </section>
      <Footer />
    </>
  );
}
