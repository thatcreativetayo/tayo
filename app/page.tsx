import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";
import Navbar from "@/components/Navbar";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "tayo. — Product Engineer & Designer",
  description:
    "I design with velocity and build with feeling. Product engineer and designer building fast, beautiful digital products from Nigeria.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "tayo. — Product Engineer & Designer",
    description:
      "I design with velocity and build with feeling. Product engineer and designer building fast, beautiful digital products from Nigeria.",
  },
};

export default function Home() {
  return (
    <div className="flex scroll-smooth flex-col h-full">
      <Navbar />
      <Hero />
      <Projects />
      <Blog />
      {/* <Testimonials /> */}
      <Contact />
    </div>
  );
}
