import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Most teams have a designer and an engineer. Tayo Eyitayo is the one who's both. Five years building across brand, product, and web.",
  alternates: { canonical: "/me" },
  openGraph: {
    url: "/me",
    title: "About Tayo Eyitayo",
    description:
      "Most teams have a designer and an engineer. Tayo is the one who's both.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tayo Eyitayo",
    description: "Most teams have a designer and an engineer. Tayo is the one who's both.",
  },
};

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
