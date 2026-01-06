import { Footer } from "@/components/footer/footer";
import React from "react";
import { reviews } from "@/lib/constants";
import { Metadata } from "next";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Gallery } from "@/components/home-gallery";
import { AboutUs } from "@/components/home-about";
import { FAQSection } from "@/components/home-faq";

export const metadata: Metadata = {
  title: "The Best Private Theatre in Bangalore - Golden Hour Celebrations",
};

export default function Page() {
  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden">
        <video
          src="/hero-video-mobile.webm"
          autoPlay
          controls={false}
          muted
          loop
          playsInline
          className="sm:hidden block absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <video
          src="/hero-video.webm"
          autoPlay
          controls={false}
          muted
          loop
          playsInline
          className="hidden sm:block absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="hidden sm:flex absolute inset-0 items-center justify-center z-10 pointer-events-none">
          <div className="text-center text-white">
            <h1 className="text-5xl font-semibold font-serif uppercase tracking-wider">
              GOLDEN HOUR <br />
              CELEBRATIONS
            </h1>
          </div>
        </div>
      </section>
      <AboutUs />
      <Gallery />
      <section className="container">
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
