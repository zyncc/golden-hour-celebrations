import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { StaticImageData } from "next/image";

interface AutomatedBentoGridProps {
  images: StaticImageData[];
  className?: string;
}

export default function AutomatedBentoGrid({
  images,
  className,
}: AutomatedBentoGridProps) {
  // Separate images based on filename prefix
  const verticalImages = images.filter((img) =>
    img.src.split("/").pop()?.toLowerCase().startsWith("v")
  );

  const horizontalImages = images.filter((img) =>
    img.src.split("/").pop()?.toLowerCase().startsWith("l")
  );

  // Create the layout pattern: V, H, H, V, H, H, V, H, H...
  const createLayoutPattern = () => {
    const pattern = [];
    let vIndex = 0;
    let hIndex = 0;

    // Calculate how many complete cycles we can make (each cycle = 1V + 2H)
    const maxCycles = Math.min(
      verticalImages.length,
      Math.floor(horizontalImages.length / 2)
    );

    // Create complete cycles
    for (let cycle = 0; cycle < maxCycles; cycle++) {
      // Add vertical image
      if (vIndex < verticalImages.length) {
        pattern.push({
          image: verticalImages[vIndex],
          type: "vertical",
          className: "aspect-w-9 aspect-h-16 row-span-2",
        });
        vIndex++;
      }

      // Add two horizontal images
      for (let h = 0; h < 2 && hIndex < horizontalImages.length; h++) {
        pattern.push({
          image: horizontalImages[hIndex],
          type: "horizontal",
          className: "aspect-w-16 aspect-h-9",
        });
        hIndex++;
      }
    }

    // Add remaining images
    while (vIndex < verticalImages.length) {
      pattern.push({
        image: verticalImages[vIndex],
        type: "vertical",
        className: "aspect-w-9 aspect-h-16 row-span-2",
      });
      vIndex++;
    }

    while (hIndex < horizontalImages.length) {
      pattern.push({
        image: horizontalImages[hIndex],
        type: "horizontal",
        className: "aspect-w-16 aspect-h-9",
      });
      hIndex++;
    }

    return pattern;
  };

  const layoutPattern = createLayoutPattern();

  return (
    <BentoGrid className={cn("w-full", className)}>
      {layoutPattern.map((item, index) => (
        <BentoGridItem
          key={`${item.image.src}-${index}`}
          className={item.className}
          image={item.image}
        />
      ))}
    </BentoGrid>
  );
}
