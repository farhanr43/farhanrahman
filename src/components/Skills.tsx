"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Skill } from "@/lib/data";
import type { SiteSettings } from "@/lib/data";

interface SkillsProps {
  skills: Skill[];
  settings: SiteSettings;
}

const iconifyIcons: Record<string, string> = {
  react: "devicon:react",
  "next.js": "devicon:nextjs",
  nextjs: "devicon:nextjs",
  typescript: "devicon:typescript",
  javascript: "devicon:javascript",
  js: "devicon:javascript",
  node: "devicon:nodedotjs",
  nodejs: "devicon:nodedotjs",
  python: "devicon:python",
  java: "devicon:java",
  csharp: "devicon:csharp",
  c: "devicon:c",
  cpp: "devicon:cplusplus",
  go: "devicon:go",
  rust: "devicon:rust",
  postgresql: "devicon:postgresql",
  postgres: "devicon:postgresql",
  mongodb: "devicon:mongodb",
  redis: "devicon:redis",
  docker: "devicon:docker",
  aws: "devicon:amazonwebservices",
  "amazon webservices": "devicon:amazonwebservices",
  kubernetes: "devicon:kubernetes",
  terraform: "devicon:terraform",
  nginx: "devicon:nginx",
  figma: "devicon:figma",
  tailwind: "devicon:tailwindcss",
  tailwindcss: "devicon:tailwindcss",
  git: "devicon:git",
  graphql: "devicon:graphql",
  android: "devicon:android",
  flutter: "devicon:flutter",
  django: "devicon:django",
  flask: "devicon:flask",
  express: "devicon:express",
  firebase: "devicon:firebase",
  webpack: "devicon:webpack",
  vite: "devicon:vite",
  elasticsearch: "devicon:elasticsearch",
  vercel: "devicon:vercel",
};

function getIconName(skillName: string): string {
  const nameLower = skillName.toLowerCase().replace(/\s+/g, "").replace(/[./]/g, "");

  if (iconifyIcons[nameLower]) return iconifyIcons[nameLower];

  for (const key of Object.keys(iconifyIcons)) {
    if (nameLower.includes(key) || key.includes(nameLower)) {
      return iconifyIcons[key];
    }
  }

  return "carbon:code";
}

export default function Skills({ skills, settings }: SkillsProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-semibold mb-4">
            {settings.skillsSectionTitle}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            {settings.skillsSectionTitle}
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            {settings.skillsSectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {skills.map((skill, index) => {
            const iconName = getIconName(skill.name);
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-6 bg-surface border border-border rounded-2xl hover:border-accent/50 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-300">
                    <Icon icon={iconName} className="text-secondary group-hover:text-accent transition-colors duration-300" style={{ fontSize: 28 }} />
                  </div>

                  <span className="text-sm font-semibold text-secondary group-hover:text-primary text-center transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent group-hover:w-3/4 transition-all duration-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        />
      </div>
    </section>
  );
}
