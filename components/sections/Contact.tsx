"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GithubIcon, Instagram, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const EMAIL = "therealteejay25@gmail.com";

function getLagosDateTime() {
  const now = new Date();
  return {
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
    }).format(now),
    date: new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      timeZone: "Africa/Lagos",
    }).format(now),
    year: new Intl.DateTimeFormat("en", {
      year: "numeric",
      timeZone: "Africa/Lagos",
    }).format(now),
  };
}

const socials = [
  {
    label: "X",
    href: "https://x.com/_tayoszn_",
    icon: NewTwitterIcon,
  },
  // {
  //   label: "Instagram",
  //   href: "https://instagram.com/_tayoszn_",
  //   icon: Instagram,
  // },
  {
    label: "GitHub",
    href: "https://github.com/thatcreativetayo",
    icon: null,
  },
];

export default function Contact() {
  const [dateTime, setDateTime] = useState<ReturnType<
    typeof getLagosDateTime
  > | null>(null);

  useEffect(() => {
    const updateDateTime = () => setDateTime(getLagosDateTime());
    updateDateTime();
    const interval = window.setInterval(updateDateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      className="relative isolate mx-auto flex min-h-[600px] w-full max-w-220 flex-col overflow-hidden bg-[#0d0e0e] text-white"
      aria-label="Contact and footer"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[65%] opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.12)_0.7px,transparent_0.7px)] [background-size:15px_15px]"
      />

      <div className="relative z-10 flex min-h-[360px] flex-1 flex-col px-6 pt-10 sm:px-10 sm:pt-12">
        <div className="mx-auto flex w-full max-w-[800px] flex-1 flex-col">
          <Image
            src="/tayo.webp"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-xl border border-white/35 object-cover grayscale"
          />

          <h2 className="mt-5 max-w-[480px] text-[clamp(2rem,4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-1.02em] text-white/90 sm:text-[clamp(2.5rem,4vw,3rem)]">
            Let&apos;s build something
            <br />
            people actually use.
          </h2>

          <motion.a
            href={`mailto:${EMAIL}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-5 inline-flex min-h-10 w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#151515] transition-colors hover:bg-white/85"
          >
            Get in touch
            <span className="flex size-6 items-center justify-center rounded-full border border-black/10">
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.a>

          <div className="mt-auto flex flex-col gap-4 border-t border-white/10 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <span>Follow me on</span>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-6 items-center justify-center rounded-md bg-white/10 text-white/75 transition-colors hover:bg-white/20 hover:text-white"
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
                </a>
              ))}
              <span className="ml-1">or get in touch on</span>
              <a
                href={`mailto:${EMAIL}`}
                aria-label={`Email ${EMAIL}`}
                className="flex size-6 items-center justify-center rounded-md bg-white/10 text-white/75 transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 6h16v12H4zM4 7l8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 sm:justify-end">
              <span>© {dateTime?.year ?? "2026"} tayo.</span>
              <span className="font-mono text-[11px] tracking-normal text-white/45">
                {dateTime ? `LAGOS ${dateTime.time}` : "LAGOS"}
              </span>
              <time className="font-mono text-[11px] tracking-normal text-white/45">
                {dateTime?.date ?? ""}
              </time>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[240px] shrink-0 overflow-hidden sm:h-[270px]">
        <Image
          src="/heroimg.png"
          alt=""
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover object-[center_66%] brightness-[0.7] saturate-[0.8]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0d0e0e] via-black/15 to-black/5"
        />
        <p
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-0.18em] overflow-hidden whitespace-nowrap text-center text-[clamp(5rem,44vw,28rem)] font-medium leading-[0.78] tracking-[-0.09em] text-lime-300/30"
        >
          tayo
        </p>
      </div>
    </footer>
  );
}
