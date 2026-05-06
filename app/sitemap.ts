import type { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";

const BASE_URL = "https://thatcreative.vercel.app";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/me`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Project pages
  const projectPages: MetadataRoute.Sitemap = projectsData.projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/blogs?limit=100`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success) {
      blogPages = data.data.map((post: { slug: string; updatedAt?: string; createdAt: string }) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {}

  return [...staticPages, ...projectPages, ...blogPages];
}
