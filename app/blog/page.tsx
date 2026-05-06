"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heart, Comment, Search01FreeIcons, Loading03Icon, PencilEdit02FreeIcons } from "@hugeicons/core-free-icons";
import Navbar from "@/components/Navbar";
import { getAllBlogs } from "@/lib/api";
import Contact from "@/components/sections/Contact";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
  likes: number;
  reads: number;
  comments: any[];
}

const allTags = [
  "Web Development",
  "Design",
  "AI",
  "Productivity",
  "Career",
  "UI/UX",
  "Technology",
  "JavaScript",
  "React",
  "Next.js",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, selectedTag, page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (searchQuery) params.search = searchQuery;
      if (selectedTag) params.tags = selectedTag;

      const response = await getAllBlogs(params);
      if (response.success) {
        setPosts(response.data);
        setTotalPages(response.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = (body: string) => {
    const words = body.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      {/* Header */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12 pt-32">
        {/* Hero Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-base mb-4">My Blog</h1>
          <p className="text-base sm:text-xl text-base/70 max-w-2xl mx-auto mb-6">
            Thoughts on design, development, and everything in between.
          </p>
          
          {/* <div className="flex items-center justify-center gap-4">
            <div className="relative w-full">
              <HugeiconsIcon
                icon={Search01FreeIcons}
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border text-base border-base/10 rounded-full text-sm focus:outline-none focus:border-base/20 w-full max-w-sm"
              />
            </div>
          </div> */}
        </motion.div>

        {/* Tags Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedTag
                  ? "bg-base text-white"
                  : "bg-base/5 text-base hover:bg-base/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-base text-white"
                    : "bg-base/5 text-base hover:bg-base/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <HugeiconsIcon icon={Loading03Icon} size={48} className="text-base/40 animate-spin" />
          </div>
        )}

        {/* Posts Grid */}
        {!loading && (
          <div className="grid grid-cols-1 gap-12">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block border-b border-base/10 pb-5">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="w-full sm:w-48 md:w-64 h-40 sm:h-36 md:h-48 shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      {/* Title */}
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-base mb-2 sm:mb-3 group-hover:text-base/80 transition-colors">
                        {post.title}
                      </h1>

                      {/* Description */}
                      <p className="text-base/70 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base md:text-lg">
                        {post.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-base/60">
                          <span>
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span>·</span>
                          <span>{post.reads} reads</span>
                        </div>

                        <div className="flex items-center gap-4 text-base/40">
                          <div className="flex items-center gap-1">
                            <HugeiconsIcon icon={Heart} size={18} />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HugeiconsIcon icon={Comment} size={18} />
                            <span className="text-sm">{post.comments.length}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-base/5 px-3 py-1 rounded-full text-xs font-medium text-base"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-base/50 mb-4">
              No posts found matching your search.
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            className="flex justify-center gap-2 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-base/5 text-base hover:bg-base/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-base/60">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-base/5 text-base hover:bg-base/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
      <Contact />
    </div>
  );
}
