import Image from "next/image";
import React from "react";

export default function Page() {
  const images = [
    {
      link: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      link: "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      link: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  return (
    <div className="mt-[100px] container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((image) => (
          <div className="aspect-w-16 aspect-h-9" key={image.link}>
            <Image
              src={image.link}
              priority
              fetchPriority="high"
              alt="gallery image"
              fill
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
