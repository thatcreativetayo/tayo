import Navbar from "@/components/Navbar";
import Contact from "@/components/sections/Contact";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="pt-10">
        <Contact />
      </div>
    </div>
  );
}
