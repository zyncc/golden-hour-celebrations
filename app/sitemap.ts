import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "https://goldenhourcelebrations.in";

  return [
    { url: `${baseURL}` },
    { url: `${baseURL}/signin` },
    { url: `${baseURL}/contact` },
    { url: `${baseURL}/about` },
    { url: `${baseURL}/services` },
    { url: `${baseURL}/book`, priority: 10 },
    { url: `${baseURL}/gallery`, priority: 9 },
  ];
}
