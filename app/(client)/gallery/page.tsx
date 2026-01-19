import { Metadata } from "next";
import _ from "lodash";
import { Gallery } from "@/components/home-gallery";

export const metadata: Metadata = {
  title: {
    absolute: "Gallery",
  },
};

export const galleryImages = [
  { src: "/v1.jpg" },
  { src: "/v10.jpg" },
  { src: "/v17.jpg" },
  { src: "/v11.jpg" },
  { src: "/v12.jpg" },

  { src: "/l1.jpg" },
  { src: "/l2.jpg" },
  { src: "/l3.jpg" },
  { src: "/l4.jpg" },
  { src: "/l5.jpg" },
  { src: "/l6.jpg" },
  { src: "/l7.jpg" },
  { src: "/l8.jpg" },
  { src: "/l9.jpg" },
  { src: "/l10.jpg" },
  { src: "/l11.jpg" },
  { src: "/l12.jpg" },
  { src: "/l13.jpg" },
  { src: "/l14.jpg" },
  { src: "/l15.jpg" },
];

export default function Page() {
  return (
    <div className="container">
      <Gallery images={_.shuffle(galleryImages)} />
    </div>
  );
}
