import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/blog/write/"] }],
    sitemap: "https://thatcreative.vercel.app/sitemap.xml",
  };
}
