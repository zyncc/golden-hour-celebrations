import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import React from "react";

export default function Page() {
  const images = [
    {
      link: "/v1.jpg",
    },
    {
      link: "/l1.jpg",
    },
    {
      link: "/l2.jpg",
    },
    {
      link: "/v2.jpg",
    },
    {
      link: "/v3.jpg",
    },
    {
      link: "/l3.jpg",
    },
    {
      link: "/l4.jpg",
    },
  ];
  return (
    <div className="my-[100px] container">
      <BentoGrid className="w-full">
        <BentoGridItem
          className={"aspect-w-9 aspect-h-16 row-span-2"}
          image={images[0].link}
        />
        <BentoGridItem
          className={"aspect-w-16 aspect-h-9"}
          image={images[1].link}
        />
        <BentoGridItem
          className={"aspect-w-16 aspect-h-9"}
          image={images[2].link}
        />
        <BentoGridItem
          className={"aspect-w-9 aspect-h-16 row-span-2"}
          image={images[3].link}
        />
        <BentoGridItem
          className={"aspect-w-16 aspect-h-9"}
          image={images[3].link}
        />
        <BentoGridItem
          className={"aspect-w-16 aspect-h-9"}
          image={images[5].link}
        />
        <BentoGridItem
          className={"aspect-w-9 aspect-h-16 row-span-2"}
          image={images[4].link}
        />
        <BentoGridItem
          className={"aspect-w-16 aspect-h-9"}
          image={images[1].link}
        />
        <BentoGridItem
          className={"aspect-w-16 aspect-h-9"}
          image={images[2].link}
        />
      </BentoGrid>
    </div>
  );
}
