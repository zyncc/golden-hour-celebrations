import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Metadata } from "next";
import v1 from "@/public/v1.jpg";
import v10 from "@/public/v10.jpg";
import v17 from "@/public/v17.jpg";
import v11 from "@/public/v11.jpg";
import v12 from "@/public/v12.jpg";
import l1 from "@/public/l1.jpg";
import l2 from "@/public/l2.jpg";
import l3 from "@/public/l3.jpg";
import l4 from "@/public/l4.jpg";
import l5 from "@/public/l5.jpg";
import l6 from "@/public/l6.jpg";
import l7 from "@/public/l7.jpg";
import l8 from "@/public/l8.jpg";
import l9 from "@/public/l9.jpg";
import l10 from "@/public/l10.jpg";
import l11 from "@/public/l11.jpg";
import l12 from "@/public/l12.jpg";
import l13 from "@/public/l13.jpg";
import l14 from "@/public/l14.jpg";
import l15 from "@/public/l15.jpg";
import _ from "lodash";
import { StaticImageData } from "next/image";

export const metadata: Metadata = {
  title: {
    absolute: "Gallery",
  },
};

const PATTERN_LOOP = ["First", "Second", "Third", "Second", "First"];

export default function Page() {
  const verticalImages = _.shuffle([v1, v10, v17, v11, v12]);
  const horizontalImages = _.shuffle([
    l1,
    l2,
    l3,
    l4,
    l5,
    l6,
    l7,
    l8,
    l9,
    l10,
    l11,
    l12,
    l13,
    l14,
    l15,
  ]);

  const rowCount = Math.floor(horizontalImages.length / 2);

  let vIndex = 0;
  let hIndex = 0;

  const rows = Array.from({ length: rowCount }).map((_, idx) => {
    const pattern = PATTERN_LOOP[idx % PATTERN_LOOP.length];
    const verticalSlice = verticalImages.slice(vIndex, vIndex + 1);
    const horizontalSlice = horizontalImages.slice(hIndex, hIndex + 2);

    if (verticalSlice.length < 1 || horizontalSlice.length < 2) return null;

    vIndex += 1;
    hIndex += 2;

    switch (pattern) {
      case "First":
        return (
          <FirstRow
            key={`row-${idx}`}
            vertical={verticalSlice}
            horizontal={horizontalSlice}
          />
        );
      case "Second":
        return (
          <SecondRow
            key={`row-${idx}`}
            vertical={verticalSlice}
            horizontal={horizontalSlice}
          />
        );
      case "Third":
        return (
          <ThirdRow
            key={`row-${idx}`}
            vertical={verticalSlice}
            horizontal={horizontalSlice}
          />
        );
      default:
        return null;
    }
  });

  return (
    <div className="my-[100px] container">
      <BentoGrid className="w-full">{rows}</BentoGrid>
    </div>
  );
}

function FirstRow({
  vertical,
  horizontal,
}: {
  vertical: StaticImageData[];
  horizontal: StaticImageData[];
}) {
  return (
    <>
      <BentoGridItem
        className="max-md:aspect-w-9 max-md:aspect-h-16 row-span-2"
        image={vertical[0]}
      />
      <BentoGridItem className="aspect-w-4 aspect-h-3" image={horizontal[0]} />
      <BentoGridItem className="aspect-w-4 aspect-h-3" image={horizontal[1]} />
    </>
  );
}

function SecondRow({
  vertical,
  horizontal,
}: {
  vertical: StaticImageData[];
  horizontal: StaticImageData[];
}) {
  return (
    <>
      <BentoGridItem
        className="max-md:aspect-w-9 max-md:aspect-h-16 row-span-2"
        image={vertical[0]}
      />
      <BentoGridItem className="aspect-w-4 aspect-h-3" image={horizontal[0]} />
      <BentoGridItem className="aspect-w-4 aspect-h-3" image={horizontal[1]} />
    </>
  );
}

function ThirdRow({
  vertical,
  horizontal,
}: {
  vertical: StaticImageData[];
  horizontal: StaticImageData[];
}) {
  return (
    <>
      <BentoGridItem
        className="max-md:aspect-w-9 max-md:aspect-h-16 row-span-2"
        image={vertical[0]}
      />
      <BentoGridItem className="aspect-w-4 aspect-h-3" image={horizontal[0]} />
      <BentoGridItem className="aspect-w-4 aspect-h-3" image={horizontal[1]} />
    </>
  );
}
