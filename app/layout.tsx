import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const BASE_URL = "https://thatcreative.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "tayo. — Product Engineer & Designer",
    template: "%s | tayo.",
  },
  description:
    "tayo. is a product engineer and designer who builds fast, beautiful, and functional digital products. Based in Nigeria.",
  keywords: [
    "tayo.",
    "product engineer",
    "product designer",
    "frontend developer",
    "UI/UX designer",
    "Next.js developer",
    "Nigeria",
    "web developer",
    "fullstack engineer",
  ],
  authors: [{ name: "tayo.", url: BASE_URL }],
  creator: "tayo.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "tayo.",
    title: "tayo. — Product Engineer & Designer",
    description:
      "tayo. builds fast, beautiful, and functional digital products. Designer and engineer in one.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "tayo. — Product Engineer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_that_creative_",
    creator: "@_that_creative_",
    title: "tayo. — Product Engineer & Designer",
    description:
      "tayo. builds fast, beautiful, and functional digital products.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-screen antialiased">
      <body className="min-h-screen w-screen bg-[#FBFBFB] flex flex-col cursor-none">
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
