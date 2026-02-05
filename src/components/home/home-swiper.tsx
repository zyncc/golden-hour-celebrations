"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import l1 from "../../../public/l1.jpg";
import l2 from "../../../public/l2.jpg";
import l3 from "../../../public/l3.jpg";
import l4 from "../../../public/l4.jpg";
import l5 from "../../../public/l5.jpg";

export default function HomeSwiper() {
  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <section className="h-screen w-screen bg-black">
      <EmblaCarousel options={OPTIONS} />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="font-serif text-3xl font-semibold tracking-wider uppercase lg:text-5xl">
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

const slides = [l1, l2, l3, l4, l5];

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
              <Image
                placeholder="blur"
                src={src}
                fill
                className="h-full w-full object-cover opacity-70"
                alt="image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
