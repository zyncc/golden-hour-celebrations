import { Gallery } from "@/components/home/home-gallery";
import { galleryImages } from "@/lib/constants";
import _ from "lodash";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Gallery",
  },
};

export default function Page() {
  return (
    <div className="container">
      <Gallery images={_.shuffle(galleryImages)} numImages={39} />
    </div>
  );
}
