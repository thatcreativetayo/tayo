'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlogCard, { BlogCardProps } from "../BlogCard";
import { getAllBlogs } from "@/lib/api";
import Link from "next/link";

export default function Blog() {
  const [posts, setPosts] = useState<BlogCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogs({ limit: 4 })
      .then((res) => {
        if (res.success) {
          setPosts(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res.data.map((p: any) => ({
              slug: p.slug,
              title: p.title,
              description: p.description,
              tags: p.tags ?? [],
              likes: p.likes ?? 0,
              comments: p.comments?.length ?? 0,
              shares: p.shares ?? 0,
              coverImage: p.coverImage,
            }))
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center py-16 relative w-full px-4 sm:px-6">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-semibold text-base text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        Where I dump my thoughts...
      </motion.h1>

      <div className="flex mt-10 w-full max-w-3xl flex-col border-t border-base/15">
        {loading ? (
          // Skeleton placeholders
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between py-7 border-b border-base/15 gap-6 animate-pulse">
              <div className="flex flex-col gap-3 flex-1">
                <div className="h-5 bg-base/10 rounded w-2/3" />
                <div className="h-4 bg-base/5 rounded w-full" />
                <div className="h-4 bg-base/5 rounded w-4/5" />
              </div>
              <div className="w-24 h-20 bg-base/5 rounded-lg flex-shrink-0" />
            </div>
          ))
        ) : posts.length === 0 ? (
          <p className="text-base/40 text-sm py-12 text-center">No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <BlogCard {...post} />
            </motion.div>
          ))
        )}
      </div>

      {!loading && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Link
            href="/blog"
            className="text-sm text-base/50 hover:text-base transition-colors underline underline-offset-4"
          >
            Read all posts
          </Link>
        </motion.div>
      )}
    </div>
  );
}
