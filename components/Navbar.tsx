'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from '@hugeicons/react';
import { Github, Instagram, Linkedin02FreeIcons, NewTwitterIcon } from '@hugeicons/core-free-icons';

const navLinks = [
  { href: "/#projects", label: "projects" },
  { href: "/me", label: "me" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
];

const socials = [
  { href: "https://x.com/_that_creative_", icon: NewTwitterIcon, label: "Twitter" },
  { href: "https://instagram.com/_that_creative_", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/in/tayo-eyitayo", icon: Linkedin02FreeIcons, label: "LinkedIn" },
  { href: "https://github.com/thatcreativetayo", icon: Github, label: "GitHub" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="flex z-50 fixed justify-between w-full px-4 md:px-9 py-4 md:py-9 bg-[#FAFAFA]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="flex items-center gap-4 md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/">
              <Image src="/logo.svg" alt="Tayo Eyitayo" width={40} height={40} className="w-10 h-auto" />
            </Link>
          </motion.div>

          {/* Desktop nav links */}
          <motion.div
            className="hidden md:flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-base/50 hover:text-base transition-colors duration-200 text-sm">
                {l.label}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Desktop socials */}
        <motion.div
          className="hidden md:flex gap-6 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {socials.map((s) => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
            >
              <HugeiconsIcon icon={s.icon} size={20} strokeWidth={2} className="text-base" />
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-0.5 bg-base rounded-full origin-center"
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-base rounded-full"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-base rounded-full origin-center"
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#FAFAFA] flex flex-col px-6 pt-24 pb-10 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-semibold text-base/70 hover:text-base transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex gap-6 items-center">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={s.icon} size={22} strokeWidth={2} className="text-base/60" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
