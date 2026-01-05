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
          src="https://ik.imagekit.io/ghc/hero-video.mp4?tr=q-100"
          autoPlay
          controls={false}
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
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
