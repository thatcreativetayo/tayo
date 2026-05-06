import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const BASE_URL = "https://tayoeyitayo.com";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(`${API_URL}/blogs/${params.id}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();

    if (!data.success) throw new Error("Not found");

    const post = data.data;
    const url = `${BASE_URL}/blog/${post.slug}`;
    const image = post.coverImage || `${BASE_URL}/og-image.png`;

    return {
      title: post.title,
      description: post.description,
      keywords: post.tags,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title: post.title,
        description: post.description,
        publishedTime: post.createdAt,
        authors: ["Tayo Eyitayo"],
        tags: post.tags,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [image],
        creator: "@_that_creative_",
      },
    };
  } catch {
    return {
      title: "Blog Post",
      description: "Read this post on Tayo Eyitayo's blog.",
    };
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
