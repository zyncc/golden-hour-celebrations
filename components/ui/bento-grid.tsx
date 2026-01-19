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
        "mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
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
  header,
  title,
  description,
  icon,
}: {
  className?: string;
  image: StaticImageData;
  header?: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento relative overflow-hidden rounded-xl shadow-input transition duration-200 hover:shadow-xl",
        className
      )}
    >
      {/* Image background */}
      <Image
        src={image}
        alt="Gallery Image"
        width={200}
        height={1000}
        priority
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />

      {/* Optional overlay content */}
      {(title || description || icon || header) && (
        <div className="relative z-10 flex h-full flex-col justify-between p-4">
          {header}
          <div className="transition duration-200 group-hover/bento:translate-x-2">
            {icon}
            {title && (
              <div className="mt-2 font-sans font-bold text-white">{title}</div>
            )}
            {description && (
              <div className="text-xs font-sans text-white/80">
                {description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
    </div>
  );
};
