"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    src: "/luxury-private-theater-decor.jpg",
    alt: "Private Theater Decoration 1",
  },
  {
    src: "/candlelight-dinner-setup.jpg",
    alt: "Candlelight Dinner Setup",
  },
  {
    src: "/romantic-movie-date-night.jpg",
    alt: "Movie Date Night",
  },
  {
    src: "/balloon-decoration-anniversary.jpg",
    alt: "Anniversary Decoration",
  },
  {
    src: "/intimate-celebration-lighting.jpg",
    alt: "Intimate Lighting",
  },
  {
    src: "/premium-cinema-experience.jpg",
    alt: "Premium Cinema",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl">
            Captured <span className="italic">Moments</span>
          </h2>
          <p className="text-sm md:text-base opacity-60 max-w-xl">
            A glimpse into the intimate celebrations we&apos;ve helped craft.
            Every detail is designed to tell your unique story.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-[400px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden rounded-xl group cursor-crosshair",
                index === 1 || index === 4 ? "col-span-1" : "col-span-1",
                index % 3 === 0 ? "row-span-2" : "row-span-1"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white text-xs uppercase tracking-widest font-medium">
                  {image.alt}
                </p>
              </div>
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
              {galleryImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <p className="mt-4 text-[10px] uppercase tracking-widest opacity-60">
                    {image.alt}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
