import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import React from "react";

export default function Page() {
  //bg-grid   bg-grid-small   bg-dot
  return (
    <>
      <section className="h-screen w-screen dark:bg-black dark:bg-grid-white/[0.07] bg-grid-small-black/[0.2] relative flex items-center justify-center bg-fixed">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-fixed"></div>
        <Spotlight className="left-0 hidden lg:block" />
        <div className="flex flex-col text-center lg:text-left w-screen items-center container">
          <p className="goldText text-5xl select-none sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b">
            Golden Hour
          </p>
          <p className="goldText text-5xl select-none sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b">
            Celebrations
          </p>
          <TextGenerateEffect
            className="text-sm"
            filter
            duration={3}
            words="It's Time to Surprise your Loved ones"
          />
        </div>
      </section>
      <section className="h-[200vh] section container flex flex-col items-center">
        <h1 className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-4xl text-center lg:text-7xl">
          About us
        </h1>
        <p className="text-center mt-5 max-w-[900px]">
          We at Golden Hour Celebrations plan your loved ones special day with
          personalised decorations exclusively in a private theatre. Celebrate
          birthdays, anniversaries, bride / groom-to-be, baby showers, valentine
          day, celebrate your achievements with us.
        </p>

        <BackgroundGradientAnimation interactive={true}>
          <div className="absolute rounded-lg container z-10 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-4xl text-center lg:text-7xl">
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
              Why Choose Us?
            </p>
          </div>
        </BackgroundGradientAnimation>
      </section>
    </>
  );
}
