"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`} className="block cursor-pointer">
        <div className="relative bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 group-hover:-translate-y-1">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <div className="bg-accent text-background p-2.5 rounded-xl shadow-lg shadow-accent/25">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-heading text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-secondary text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-background border border-border rounded-full text-secondary"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs px-3 py-1 bg-background border border-border rounded-full text-secondary">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
