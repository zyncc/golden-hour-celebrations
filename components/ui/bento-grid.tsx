import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  image,
}: {
  className?: string;
  image?: StaticImageData;
}) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black bg-white border border-transparent overflow-hidden",
        className
      )}
    >
      <div className="w-full h-full">
        <Image
          className="rounded-lg object-cover"
          src={image!}
          alt="Gallery Image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          placeholder="blur"
        />
      </div>
    </div>
  );
};
