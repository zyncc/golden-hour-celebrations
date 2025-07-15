import { Footer } from "@/components/footer/footer";
import React from "react";
import { reviews } from "@/lib/constants";
import { FAQSection } from "@/components/faqs/faq";
import { Metadata } from "next";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import v10 from "@/public/v10.jpg";
import v17 from "@/public/v17.jpg";
import v11 from "@/public/v11.jpg";
import v12 from "@/public/v12.jpg";
import v1 from "@/public/v1.jpg";
import l1 from "@/public/l1.jpg";
import l12 from "@/public/l12.jpg";
import l3 from "@/public/l3.jpg";
import l4 from "@/public/l4.jpg";
import l5 from "@/public/l5.jpg";
import l15 from "@/public/l15.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The Best Private Theatre in Bangalore - Golden Hour Celebrations",
};

export default function Page() {
  const verticalImages = [v10, v17, v11, v12];
  const horizontalImages = [l1, l12, l3, l4, l5, l15];
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
      <section id="gallery" className="w-full my-[200px]">
        <div className="parent container">
          <div className={`div1`}>
            <Image
              src={verticalImages[0]}
              alt={`Gallery image`}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
          <div className={`div2`}>
            <Image
              src={horizontalImages[0]}
              alt={`Gallery image`}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
          <div className={`div3`}>
            <Image
              src={verticalImages[1]}
              alt={`Gallery image`}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
          <div className={`div4`}>
            <Image
              src={verticalImages[2]}
              alt={`Gallery image`}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
          <div className={`div5`}>
            <Image
              src={horizontalImages[1]}
              alt={`Gallery image`}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
          <div className={`div6`}>
            <Image
              src={verticalImages[3]}
              alt={`Gallery image`}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
        </div>
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
