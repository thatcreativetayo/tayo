import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on design, engineering, product, and everything in between — by Tayo Eyitayo.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "Blog — Tayo Eyitayo",
    description:
      "Thoughts on design, engineering, product, and everything in between.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Tayo Eyitayo",
    description: "Thoughts on design, engineering, product, and everything in between.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
