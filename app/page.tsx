import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";
import Navbar from "@/components/Navbar";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Spacer from "@/components/Spacer";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "tayo.",
  description:
    "i build stuff.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "tayo.",
    description:
      "i build stuff.",
  },
};

export default function Home() {
  return (
    <div className="flex scroll-smooth relative flex-col h-full items-center ">
            <div className="hidden lg:block h-full min-h-screen z-20 absolute left-40 border text-black/10 border-long-dashed"></div>
      <div className="hidden lg:block h-full min-h-screen z-20 absolute right-40 border text-black/10 border-long-dashed"></div>
      <Navbar />
      <Hero />
      <Spacer />
      <About />
      <Spacer />
      <Projects />
      <Spacer />
      <Blog />
      {/* <Testimonials /> */}
      <Contact />
    </div>
  );
}
