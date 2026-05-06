'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center relative h-screen w-screen">
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute"
      > */}
        <Image
          src="/heroimg.svg"
          alt=""
          width={6000}
          height={6000}
          className="z-10 hidden md:block w-screen absolute h-auto"
        />
      {/* </motion.div> */}
      <div className="z-20 h-auto md:h-115 relative flex flex-col justify-center items-center gap-6 md:gap-8 px-4 text-center">
        <motion.h1 
          className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-16 text-center text-base"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="text-base/50 z-10">Welcome to my world.</span> <br /> Product Engineer & Designer.
        </motion.h1>
       <a href="/#projects">
         <motion.button 
          className="bg-base z-10 cursor-pointer hover:shadow-base/45 transition-all duration-200 rounded-full py-2.75 text-white font-semibold px-10 md:px-14 shadow-lg shadow-base/35"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Let&apos;s Go!
        </motion.button>
       </a>
        <Image
          src="/heroimg2.svg"
          alt=""
          width={6000}
          height={6000}
          className="z-0 md:bottom-0 -bottom-20 absolute h-auto"
        />
      </div>
    </div>
  );
}
