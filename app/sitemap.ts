import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = "https://goldenhourcelebrations.in";
  return [
    { url: `${baseURL}` },
    { url: `${baseURL}/signin` },
    { url: `${baseURL}/contact` },
    { url: `${baseURL}/about` },
    { url: `${baseURL}/services` },
    { url: `${baseURL}/book` },
    { url: `${baseURL}/gallery` },
  ];
}
