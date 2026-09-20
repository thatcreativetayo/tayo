import Navbar from "@/components/Navbar";
import Contact from "@/components/sections/Contact";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
       <div className="flex scroll-smooth mt-20 relative flex-col h-full items-center ">
            <div className="hidden lg:block h-full min-h-screen z-20 absolute left-40 border text-black/10 border-long-dashed"></div>
      <div className="hidden lg:block h-full min-h-screen z-20 absolute right-40 border text-black/10 border-long-dashed"></div>
        <Contact />
      </div>
    </div>
  );
}
