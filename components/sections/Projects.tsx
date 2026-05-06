"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "../ProjectCard";
import projectsData from "@/data/projects.json";

const API_IDS = ["scribe-api", "zeepay-api", "axle-api", "synq-api", "ecovest-api"];
const WEB_IDS = ["axle", "examedge", "veneer", "dex-gadgets", "stormate"];

export default function Projects() {
  const categories = ["All", "Web Apps", "API Services"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projectsData.projects
      : activeCategory === "API Services"
      ? projectsData.projects.filter((p) => API_IDS.includes(p.id))
      : projectsData.projects.filter((p) => WEB_IDS.includes(p.id));

  return (
    <div id="projects" className="flex flex-col p-4 md:p-9 relative min-h-screen w-full">
      <motion.h2
        className="text-2xl md:text-3xl w-full max-w-4xl text-base"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        tayo turns difficult problems into delightful solutions — and designs
        mobile and web experiences you might accidentally spend hours on.
      </motion.h2>

      <div className="py-5 gap-6 w-full flex flex-col">
        <motion.div
          className="bg-[#f5f5f5] w-fit my-4 p-2 rounded-full flex gap-2 border-6 shadow-inner border-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2.5 px-5 text-xs md:text-sm rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-base text-white"
                  : "text-base/50 hover:text-base"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
