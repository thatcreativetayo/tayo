'use client';

import { Comment, Heart, Share08FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  coverImage?: string;
}

export default function BlogCard({ slug, title, description, tags, likes, comments, shares, coverImage }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="flex min-h-32 justify-between py-5 sm:py-7 border-b border-base/15 group gap-4 sm:gap-6">
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <motion.h2
            className="text-xl font-semibold text-base truncate"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {title}
          </motion.h2>
          <motion.h3
            className="text-md font-medium text-base/50 line-clamp-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {description}
          </motion.h3>
        </div>

        <motion.div
          className="flex gap-2.5 items-center flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {tags.slice(0, 3).map((tag) => (
            <motion.div
              key={tag}
              className="border border-base/10 text-xs bg-base/5 text-base font-medium rounded-full py-1.25 px-5"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex gap-3 items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="flex gap-1 items-center">
            <HugeiconsIcon icon={Heart} size={16} strokeWidth={2} className="text-base" />
            <p className="text-base/60 text-sm">{likes} likes</p>
          </div>
          <div className="flex gap-1 items-center">
            <HugeiconsIcon icon={Comment} size={16} strokeWidth={2} className="text-base" />
            <p className="text-base/60 text-sm">{comments} comments</p>
          </div>
          <div className="flex gap-1 items-center">
            <HugeiconsIcon icon={Share08FreeIcons} size={16} strokeWidth={2} className="text-base" />
            <p className="text-base/60 text-sm">{shares} shares</p>
          </div>
        </motion.div>
      </div>

      {coverImage && (
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={coverImage}
            alt={title}
            className="h-20 sm:h-full w-auto max-w-24 sm:max-w-32 object-cover rounded-lg"
          />
        </motion.div>
      )}
    </Link>
  );
}
