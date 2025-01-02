import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Metadata } from "next";
import React from "react";
import v1 from "@/public/v1.jpg";
import v2 from "@/public/v2.jpg";
import v3 from "@/public/v3.jpg";
import l1 from "@/public/l1.jpg";
import l2 from "@/public/l2.jpg";
import l3 from "@/public/l3.jpg";
import l4 from "@/public/l4.jpg";
import l5 from "@/public/l5.jpg";

export const metadata: Metadata = {
  title: {
    absolute: "Gallery",
  },
};

export default function Page() {
  const images = [v1, v2, v3, l1, l2, l3, l4, l5];
  return (
    <div className="my-[100px] container">
      <BentoGrid className="w-full">
        <BentoGridItem
          className={"aspect-w-9 aspect-h-16 row-span-2"}
          image={images[0]}
        />
        <BentoGridItem className={"aspect-w-16 aspect-h-9"} image={images[3]} />
        <BentoGridItem className={"aspect-w-16 aspect-h-9"} image={images[4]} />
        <BentoGridItem
          className={"aspect-w-9 aspect-h-16 row-span-2"}
          image={images[1]}
        />
        <BentoGridItem className={"aspect-w-16 aspect-h-9"} image={images[5]} />
        <BentoGridItem className={"aspect-w-16 aspect-h-9"} image={images[6]} />
        <BentoGridItem
          className={"aspect-w-9 aspect-h-16 row-span-2"}
          image={images[2]}
        />
        <BentoGridItem className={"aspect-w-16 aspect-h-9"} image={images[7]} />
        <BentoGridItem className={"aspect-w-16 aspect-h-9"} image={images[3]} />
      </BentoGrid>
    </div>
  );
}
