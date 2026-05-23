"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/data";

interface ProjectsListProps {
  projects: Project[];
  tags: string[];
}

export default function ProjectsList({ projects, tags }: ProjectsListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter((p) => p.tags.includes(selectedTag))
    : projects;

  return (
    <>
      <main className="min-h-screen pt-20">
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                Projects
              </h1>
              <p className="text-secondary text-lg max-w-xl mx-auto">
                A collection of projects I&apos;ve worked on, showcasing my skills and experience.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-5 min-h-[44px] rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === null
                    ? "bg-accent text-background"
                    : "bg-surface border border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-5 min-h-[44px] rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? "bg-accent text-background"
                      : "bg-surface border border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <p className="text-secondary text-center">No projects found with this tag.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}