'use client';

import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01FreeIcons, LinkSquare02FreeIcons, Github01FreeIcons } from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import projectsData from '@/data/projects.json';
import Navbar from '@/components/Navbar';

export default function ProjectCaseStudy() {
  const params = useParams();
  const projectId = params.id as string;
  
  const project = projectsData.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#fbfbfb] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-base mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-base/60 hover:text-base underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 pt-32">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-base/60 hover:text-base transition-colors mb-8"
          >
            <HugeiconsIcon icon={ArrowLeft01FreeIcons} size={20} />
            <span className="text-sm font-medium">Back to Projects</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-base">{project.title}</h1>
            <span className="bg-base/10 text-base text-sm px-3 py-1 rounded-full">
              {project.year}
            </span>
          </div>
          <p className="text-xl md:text-2xl text-base/70 mb-6">{project.subtitle}</p>
          
          {/* Links */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-base text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-base/90 transition-colors"
            >
              <HugeiconsIcon icon={LinkSquare02FreeIcons} size={18} />
              View Live
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-base/5 text-base px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-base/10 transition-colors"
              >
                <HugeiconsIcon icon={Github01FreeIcons} size={18} />
                View Code
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Image */}
        <motion.div
          className="w-full aspect-video bg-gradient-to-br from-base/5 to-base/10 rounded-2xl mb-12 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-8xl md:text-9xl font-bold text-base/20">
            {project.title.charAt(0)}
          </span>
        </motion.div>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="bg-base/5 text-base px-4 py-2 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Case Study Content */}
        <div className="space-y-12">
          {/* The Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-base mb-4">The Challenge</h2>
            <p className="text-base/70 text-lg leading-relaxed">
              {project.caseStudy.challenge}
            </p>
          </motion.section>

          {/* The Solution */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-base mb-4">The Solution</h2>
            <p className="text-base/70 text-lg leading-relaxed">
              {project.caseStudy.solution}
            </p>
          </motion.section>

          {/* Impact */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-base mb-6">Impact</h2>
            <ul className="space-y-3">
              {project.caseStudy.impact.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 text-base/70 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <span className="text-base font-bold mt-1">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Features */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-base mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.caseStudy.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-base/5 p-4 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                >
                  <p className="text-base/80 text-sm">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-base mb-6">Tech Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.caseStudy.techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-base/70"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.05 }}
                >
                  <span className="w-2 h-2 bg-base rounded-full"></span>
                  <span className="text-sm">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Lessons Learned */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-base mb-6">Lessons Learned</h2>
            <ul className="space-y-3">
              {project.caseStudy.lessons.map((lesson, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 text-base/70 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                >
                  <span className="text-base font-bold mt-1">→</span>
                  <span>{lesson}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 pt-12 border-t border-base/10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <h3 className="text-2xl font-bold text-base mb-4">Interested in working together?</h3>
          <p className="text-base/70 mb-6">Let's build something amazing.</p>
          <Link
            href="/contact"
            className="inline-block bg-base text-white px-8 py-3 rounded-full font-semibold hover:bg-base/90 transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
