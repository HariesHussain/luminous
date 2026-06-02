import { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.websiteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", 
        "/_next/", 
        "/static/",
        "/private/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
