import { Footer } from "@/components/footer/footer";
import { AboutUs } from "@/components/home/home-about";
import { FAQSection } from "@/components/home/home-faq";
import { Gallery } from "@/components/home/home-gallery";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { reviews } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Best Private Theatre in Bangalore - Golden Hour Celebrations",
};

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

export default function Page() {
  return (
    <>
      <section className="relative h-screen w-screen overflow-hidden">
        <video
          src="/hero-video-mobile.webm"
          autoPlay
          controls={false}
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 block min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover sm:hidden"
        />
        <video
          src="/hero-video.webm"
          autoPlay
          controls={false}
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 hidden min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover sm:block"
        />
        <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center sm:flex">
          <div className="text-center text-white">
            <h1 className="font-serif text-5xl font-semibold tracking-wider uppercase">
              GOLDEN HOUR <br />
              CELEBRATIONS
            </h1>
          </div>
        </div>
      </section>
      <AboutUs />
      <Gallery images={galleryImages} />
      <section className="container">
        <FAQSection />
      </section>
      <section id="reviews" className="container py-[100px]">
        <h1 className="bg-linear-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-semibold text-transparent lg:text-7xl">
          Reviews
        </h1>
        <div className="relative mt-10 flex w-full flex-col items-center justify-center overflow-hidden">
          <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
          <InfiniteMovingCards items={reviews} direction="left" speed="slow" />
        </div>
      </section>
      <Footer />
    </>
  );
}
