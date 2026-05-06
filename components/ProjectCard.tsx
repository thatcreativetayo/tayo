'use client';

import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string | null;
  featured: boolean;
  year: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div 
      className="h-auto w-full group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <motion.div 
        className="w-full p-3 shadow-inner group-hover:rounded-3xl transition-all duration-300 bg-[#f5f5f5] overflow-hidden h-fit"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full aspect-video bg-gradient-to-br from-base/5 to-base/10 rounded-2xl flex items-center justify-center">
          <span className="text-4xl md:text-6xl font-bold text-base/20">
            {project.title.charAt(0)}
          </span>
        </div>
      </motion.div>
      <div className="flex flex-col gap-3 mt-5">
        <motion.div 
          className="flex justify-between items-start w-full gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="text-base text-lg font-semibold">{project.title}</h2>
          <motion.div 
            className="bg-base/5 text-base text-xs rounded-full py-1.5 px-3.5 whitespace-nowrap"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(45, 25, 9, 0.1)" }}
          >
            {project.year}
          </motion.div>
        </motion.div>
        <motion.p 
          className="text-base/80 text-xs font-medium mb-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {project.subtitle}
        </motion.p>
        <motion.p 
          className="w-full text-base/65 text-sm line-clamp-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {project.description}
        </motion.p>
        <motion.div 
          className="flex flex-wrap gap-2 mt-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-xs bg-base/5 text-base/70 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs bg-base/5 text-base/70 px-2.5 py-1 rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </motion.div>
        <motion.div
          className="flex gap-3 mt-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Link
            href={`/projects/${project.id}`}
            className="flex gap-1.25 cursor-pointer items-center group/link"
          >
            <motion.h1 
              className="text-base font-semibold text-sm"
              whileHover={{ x: 2 }}
            >
              Read Case Study
            </motion.h1>
            <motion.div
              whileHover={{ x: 2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <HugeiconsIcon
                icon={ArrowUpRight}
                size={18}
                strokeWidth={2}
                className="text-base"
              />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
