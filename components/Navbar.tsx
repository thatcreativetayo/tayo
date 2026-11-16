'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Instagram, NewTwitterIcon } from "@hugeicons/core-free-icons";

const navLinks = [
  { href: "/#projects", label: "projects" },
  { href: "/blog", label: "blog" },
  // { href: "/contact", label: "contact" },
] as const;

const socials = [
  { href: "https://x.com/_tayoszn_", icon: NewTwitterIcon, label: "Twitter" },
  { href: "https://instagram.com/_tayoszn_", icon: Instagram, label: "Instagram" },
  { href: "https://github.com/thatcreativetayo", icon: null, label: "GitHub" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      aria-label="Main navigation"
      className="fixed left-1/2 top-0 z-50 w-200 max-w-[calc(100vw-2rem)] -translate-x-1/2 text-base"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="relative flex min-h-14 w-full items-center justify-between gap-2 rounded-b-[26px] bg-base p-2 text-light shadow-[0_8px_30px_rgba(48,47,45,0.05)] sm:gap-4 sm:px-2">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute right-full top-0 size-4 overflow-visible text-base"
        >
          <path
            d="M 0 0 C 11.046 0 20 8.954 20 20 H 21 V -1 H 0 Z"
            fill="currentColor"
          />
        </svg>
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute left-full top-0 size-4 overflow-visible text-base"
        >
          <path
            d="M 20 0 C 8.954 0 0 8.954 0 20 H -1 V -1 H 20 Z"
            fill="currentColor"
          />
        </svg>

        <Link
          href="/"
          aria-label="tayo. home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/tayo.webp"
            alt="tayo."
            width={40}
            height={40}
            priority
            className="h-9 w-9 rounded-full object-cover"
          />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-1 sm:gap-5">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/blog" && pathname.startsWith("/blog")) ||
              // (link.href === "/contact" && pathname.startsWith("/contact")) ||
              (link.href === "/#projects" && pathname === "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap rounded-full text-xs transition-all duration-300 sm:px-3 sm:text-sm ${
                  isActive
                    ? "font-medium text-light"
                    : "text-light/65 hover:text-light"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex size-8 items-center justify-center rounded-full text-light/65 transition-colors hover:bg-light/10 hover:text-light"
            >
              {social.icon === null ? (
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 34 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.7296 0.000118661C12.7606 -0.0148512 8.91666 1.38704 5.8892 3.95356C2.86174 6.52008 0.849549 10.0828 0.214658 14.0006C-0.420233 17.9184 0.363852 21.9342 2.42584 25.3255C4.48784 28.7168 7.69237 31.2609 11.4629 32.5001C12.2962 32.6334 12.5629 32.1168 12.5629 31.6668V28.8501C7.94623 29.8501 6.9629 26.6668 6.9629 26.6668C6.65164 25.6317 5.97689 24.7438 5.0629 24.1668C3.54623 23.1335 5.17957 23.1668 5.17957 23.1668C5.70273 23.2345 6.20383 23.4195 6.64541 23.7081C7.08698 23.9967 7.4576 24.3814 7.72957 24.8335C8.19253 25.6566 8.96177 26.2638 9.87 26.5228C10.7782 26.7819 11.752 26.6719 12.5796 26.2168C12.6555 25.3719 13.0274 24.5809 13.6296 23.9835C10.0629 23.6168 6.09623 22.1835 6.09623 15.8335C6.04802 14.1692 6.64522 12.5508 7.7629 11.3168C7.25546 9.88251 7.31508 8.30857 7.92957 6.91679C7.92957 6.91679 9.32957 6.46678 12.5129 8.58345C15.2422 7.84975 18.1169 7.84975 20.8462 8.58345C24.0296 6.43345 25.4296 6.91679 25.4296 6.91679C26.0441 8.30857 26.1037 9.88251 25.5962 11.3168C26.7139 12.5508 27.3111 14.1692 27.2629 15.8335C27.2629 22.2001 23.3629 23.6001 19.6462 24.0168C20.0465 24.4191 20.3562 24.9024 20.5545 25.4341C20.7529 25.9659 20.8353 26.5339 20.7962 27.1001V31.6668C20.7962 32.1168 21.0629 32.6501 21.9129 32.5001C25.6765 31.2631 28.8765 28.7258 30.9389 25.3433C33.0013 21.9607 33.7914 17.9541 33.1674 14.0418C32.5435 10.1295 30.5463 6.56747 27.534 3.99427C24.5217 1.42108 20.6913 0.00506104 16.7296 0.000118661Z"
                    fill="#FAFAFA"
                  />
                </svg>
              ) : (
                <HugeiconsIcon
                  icon={social.icon}
                  size={17}
                  strokeWidth={1.7}
                />
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
