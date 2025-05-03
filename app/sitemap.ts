import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = "https://goldenhourcelebrations.in";
  return [
    { url: `${baseURL}` },
    { url: `${baseURL}/contact` },
    { url: `${baseURL}/services` },
    { url: `${baseURL}/book` },
    { url: `${baseURL}/gallery` },
  ];
}
