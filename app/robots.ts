import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/admin",
        "/privacy",
        "/terms",
        "/refunds",
        "/success",
        "/account",
      ],
    },
    sitemap: "https://goldenhourcelebrations.in/sitemap.xml",
  };
}