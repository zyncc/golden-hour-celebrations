import { Footer } from "@/components/footer/footer";
import { AboutUs } from "@/components/home/home-about";
import { FAQSection } from "@/components/home/home-faq";
import { Gallery } from "@/components/home/home-gallery";
import HomeSwiper from "@/components/home/home-swiper";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { galleryImages, reviews } from "@/lib/constants";
import _ from "lodash";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Best Private Theatre in Bangalore - Golden Hour Celebrations",
};

export default function Page() {
  return (
    <>
      <HomeSwiper />
      <AboutUs />
      <Gallery images={_.shuffle(galleryImages)} numImages={6} />
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
