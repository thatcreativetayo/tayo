import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const BASE_URL = "https://tayoszn.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "tayo.",
    template: "%s | tayo.",
  },
  description:
    "i build stuff.",
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
    title: "tayo.",
    description:
      "i build stuff..",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "tayo.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_tayoszn_",
    creator: "@_tayoszn_",
    title: "tayo.",
    description:
      "i build stuff.",
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
    icon: "/tayo.jpg",
    shortcut: "/tayo.jpg",
    apple: "/tayo.jpg",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-screen antialiased">
      <body className="min-h-screen w-full overflow-x-hidden bg-[#FBFAF9] flex flex-col">
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
