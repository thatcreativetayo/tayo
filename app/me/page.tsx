"use client"
import Navbar from "@/components/Navbar";
import Contact from "@/components/sections/Contact";
import Blog from "@/components/sections/Blog";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  "/gallery/bread.png",
  "/gallery/btc.png",
  "/gallery/Facebook post - 2.png",
  "/gallery/Frame 2147227527.png",
  "/gallery/Frame 391.png",
  "/gallery/IMG_20260321_123618_058.jpg",
  "/gallery/Instagram post - 3 (1).png",
  "/gallery/Instagram post - 3.png",
  "/gallery/Instagram post - 4.png",
  "/gallery/jordan.png",
  "/gallery/MacBook Pro 16_ - 35.png",
  "/gallery/New Project.png",
  "/gallery/nike.png",
  "/gallery/portfolio.png",
  "/gallery/portfolio2.png",
  "/gallery/studi (3) (1).png",
  "/gallery/studi (3).png",
  "/gallery/Twitter header - 6.png",
  "/gallery/Twitter post - 2.png",
  "/gallery/Twitter post - 3.png",
  "/gallery/Twitter post - 4.png",
  "/gallery/Twitter post - 5.png",
  "/gallery/Twitter post - 7.png",
  "/gallery/Twitter post - 8.png",
];

const bentoWidths = [
  "w-120"
];

function GalleryStrip() {
  const items = [...galleryImages, ...galleryImages];
  return (
    <div className="w-full overflow-hidden py-8">
      <div className="flex items-center gap-3 px-4 md:px-14 mb-4">
        <span className="text-xs text-base/40 font-medium tracking-widest uppercase">Gallery</span>
        <span className="text-xs bg-base/5 text-base/50 px-2.5 py-0.5 rounded-full font-medium">{galleryImages.length}</span>
      </div>
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className={`${bentoWidths[i % bentoWidths.length]} flex-shrink-0 overflow-hidden h-fit`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-auto block"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.style.display = "none";
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Me() {
  return (
    <div className="flex flex-col h-full">
      <Navbar />

      <div className="flex flex-col px-4 md:px-14 h-full pb-12 pt-28 md:pt-32">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed gap-2 text-left text-base">
          Most teams have a designer and an engineer. I&apos;m the one who&apos;s both.
          Five years building across brand, product, and web has taught me one
          thing: people don&apos;t separate how something looks from how something
          works. So I don&apos;t either. I design with velocity and build with
          feeling. Off the clock, I&apos;m probably rewatching an{" "}
          <span className="inline-flex items-center mx-1 translate-y-2">
            <Image src="/aot.png" alt="" width={36} height={36} className="size-9 rotate-2 rounded-xl border border-base/5 object-cover" />
          </span>{" "}
          anime arc or grinding{" "}
          <span className="inline-flex items-center mx-1 translate-y-2">
            <Image src="/fc.png" alt="" width={36} height={36} className="size-9 rotate-2 rounded-xl border border-base/5 object-cover" />
          </span>{" "}
          FC26. Both require the same thing: pattern recognition and the will to
          keep going. If that sounds like what your project needs, I&apos;d love to
          hear about it.
        </h1>

        <p className="text-base mt-24 leading-6.75 max-w-4xl mx-auto w-full">
          I didn&apos;t grow up drawing. But the first time I opened{" "}
          <span className="inline-flex items-center mx-1 translate-y-2">
            <Image src="/figma.png" alt="" width={28} height={28} className="size-7 rotate-2 rounded-lg border border-base/5 object-cover" />
          </span>{" "}
          Figma and made something out of nothing, something clicked, and it never
          unclicked. I&apos;m from{" "}
          <span className="inline-flex items-center mx-1 translate-y-2">
            <Image src="/nigeria.png" alt="" width={28} height={28} className="size-7 rotate-2 rounded-lg border border-base/5" />
          </span>{" "}
          Nigeria, and I think that shapes everything I make. There&apos;s a richness,
          an energy, a refusal to be boring that I carry into every project. Design,
          to me, has always been about feeling, not just looking. I grew up on
          Cartoon Network. I stayed up for{" "}
          <span className="inline-flex items-center mx-1 translate-y-2">
            <Image src="/aot.png" alt="" width={28} height={28} className="size-7 rotate-2 rounded-lg border border-base/5 object-cover" />
          </span>{" "}
          Attack on Titan. I design to{" "}
          <span className="inline-flex items-center mx-1 translate-y-2">
            <Image src="/rnb.png" alt="" width={28} height={28} className="size-7 rotate-2 rounded-lg border border-base/5 object-cover" />
          </span>{" "}
          R&amp;B that moves slow and hits hard. All of it taught me the same thing:
          the best stories make you feel seen. So that&apos;s what I build. Products
          that feel like someone thought about you. Brands that carry weight.
          Interfaces that don&apos;t just work, they resonate. I&apos;m a builder and a
          storyteller, and I&apos;ve stopped pretending those are different jobs. Whether
          it&apos;s a startup finding its voice or a product shipping its first feature,
          I want in, and I want to make it matter. Emotion and velocity. That&apos;s
          always been the whole thing.
        </p>
      </div>

      {/* Infinite photo strip */}
      <div className="w-full mt-16">
        <GalleryStrip />
      </div>

      <Blog />

      <Contact />
    </div>
  );
}
