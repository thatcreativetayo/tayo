import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blog",
  description:
    "thoughts on design, engineering, product, and everything in between by tayo.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "blog — tayo.",
    description:
      "thoughts on design, engineering, product, and everything in between.",
  },
  twitter: {
    card: "summary_large_image",
    title: "blog — tayo.",
    description: "thoughts on design, engineering, product, and everything in between.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
