"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";

export default function HomeSwiper() {
  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <section className="h-screen w-screen bg-black">
      <EmblaCarousel options={OPTIONS} />
      <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center sm:flex">
        <div className="text-center text-white">
          <h1 className="font-serif text-5xl font-semibold tracking-wider uppercase">
            GOLDEN HOUR <br />
            CELEBRATIONS
          </h1>
        </div>
      </div>
    </section>
  );
}

type PropType = {
  options?: EmblaOptionsType;
};

const slides = ["/l1.jpg", "/l2.jpg", "/l3.jpg", "/l4.jpg", "/l5.jpg"];

function EmblaCarousel(props: PropType) {
  const { options } = props;
  const [emblaRef] = useEmblaCarousel(options, [
    Fade(),
    Autoplay({
      delay: 3000,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
    }),
  ]);

  return (
    <section className="embla h-screen w-screen bg-black">
      <div className="embla__viewport h-full w-full" ref={emblaRef}>
        <div className="embla__container h-full w-full">
          {slides.map((src, index) => (
            <div
              className="embla__slide flex h-full w-full items-center justify-center"
              key={index}
            >
              <img src={src} className="h-full w-full opacity-70" alt="image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
