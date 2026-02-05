"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image, { StaticImageData } from "next/image";

type Images = {
  src: string;
  optimisedSource: StaticImageData;
  alt?: string;
};

export function Gallery({ images, numImages }: { images: Images[]; numImages: number }) {
  return (
    <section id="gallery" className="bg-background py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl">
            Captured <span className="italic">Moments</span>
          </h2>
          <p className="max-w-xl text-sm opacity-60 md:text-base">
            A glimpse into the intimate celebrations we&apos;ve helped craft. Every detail
            is designed to tell your unique story.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden auto-rows-[400px] grid-cols-3 gap-6 md:grid">
          {images.slice(0, numImages).map((image, index) => (
            <div
              key={index}
              className={cn(
                "group relative cursor-crosshair overflow-hidden rounded-xl",
                index === 1 || index === 4 ? "col-span-1" : "col-span-1",
                index % 3 === 0 ? "row-span-2" : "row-span-1",
              )}
            >
              <Image
                src={image.optimisedSource}
                fill
                placeholder="blur"
                alt={"home gallery image"}
                className="h-full w-full rounded-xl object-cover transition-all duration-700 group-hover:scale-105"
              />
              {image.alt && (
                <div className="absolute inset-0 flex items-end bg-black/40 p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-xs font-medium tracking-widest text-white uppercase">
                    {image.alt}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Carousel Layout */}
        <div className="md:hidden">
          <Carousel
            className="w-full"
            plugins={[Autoplay({ playOnInit: true, delay: 2000 })]}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-4/5 overflow-hidden">
                    <img
                      src={image.src}
                      alt={"home gallery image"}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                  {image.alt && (
                    <p className="mt-4 text-[10px] tracking-widest uppercase opacity-60">
                      {image.alt}
                    </p>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
