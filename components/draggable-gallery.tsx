import v10 from "@/public/v10.jpg";
import v17 from "@/public/v17.jpg";
import v11 from "@/public/v11.jpg";
import v12 from "@/public/v12.jpg";
import v1 from "@/public/v1.jpg";
import l1 from "@/public/l1.jpg";
import l3 from "@/public/l3.jpg";
import l4 from "@/public/l4.jpg";
import l5 from "@/public/l5.jpg";
import l15 from "@/public/l15.jpg";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Image from "next/image";

const items = [
  {
    image: l15,
    className: "absolute top-10 left-[20%] rotate-[-5deg]",
  },
  {
    image: v10,
    className: "absolute top-40 left-[25%] rotate-[-7deg]",
  },
  {
    image: v17,
    className: "absolute top-5 left-[40%] rotate-[8deg]",
  },
  {
    image: v11,
    className: "absolute top-32 left-[55%] rotate-[10deg]",
  },
  {
    image: l1,
    className: "absolute top-20 right-[35%] rotate-[2deg]",
  },
  {
    image: l5,
    className: "absolute top-24 left-[20%] rotate-[-7deg]",
    title: "The Images!",
  },
  {
    image: l3,
    className: "absolute top-8 left-[30%] rotate-[4deg]",
  },
  {
    image: l4,
    className: "absolute top-4 left-[10%] rotate-[6deg]",
    title: "Drag",
  },
];

export function DraggableGallery() {
  return (
    <DraggableCardContainer className="relative flex h-screen w-full items-center justify-center overflow-clip">
      {items.map((item, index) => (
        <DraggableCardBody
          key={index}
          className={item.className + "cursor-grab"}
        >
          <Image
            src={item.image}
            alt="gallery image"
            placeholder="blur"
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
