"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "../ProjectCard";
import projectsData from "@/data/projects.json";
import { easeOut, easeSoft, viewportOnce } from "@/lib/motion";

const API_IDS = ["scribe-api", "zeepay-api", "axle-api", "synq-api", "ecovest-api"];
const WEB_IDS = ["axle", "examedge", "veneer", "dex-gadgets", "stormate"];

export default function Projects() {
  const categories = ["All", "Web Apps", "API Services"];
  const [activeCategory, setActiveCategory] = useState("All");
  const reduceMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === "All"
      ? projectsData.projects
      : activeCategory === "API Services"
      ? projectsData.projects.filter((p) => API_IDS.includes(p.id))
      : projectsData.projects.filter((p) => WEB_IDS.includes(p.id));

  return (
    <div id="projects" className="flex lowercase flex-col p-4 md:p-9 relative min-h-screen max-w-304 w-full">
      <motion.h2
        className="text-2xl md:text-3xl w-full max-w-4xl text-base"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        tayo turns difficult problems into delightful solutions — and designs
        mobile and web experiences you might accidentally spend hours on.
      </motion.h2>

      <div className="py-5 gap-6 w-full flex flex-col">
        <motion.div
          className="bg-[#f5f5f5] w-fit max-w-full my-4 p-2 rounded-full flex flex-wrap gap-2 border-6 shadow-inner border-white"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2.5 px-5 min-h-10 text-xs md:text-sm rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-base text-white"
                  : "text-base/50 hover:text-base"
              }`}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.2, ease: easeSoft }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : Math.min(index * 0.08, 0.4),
                ease: easeOut,
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
