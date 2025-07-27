import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Block API routes from indexing
          "/temp/", // Temporary files
          "/_next/", // Next.js internal files
          "/private/", // Any private content
        ],
      },
    ],
    sitemap: "https://mehmetkucak.com/sitemap.xml",
  };
}
