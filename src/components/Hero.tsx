"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Profile } from "@/lib/data";
import type { SiteSettings } from "@/lib/data";
import HeroCodeDecorations from "./HeroCodeDecorations";

interface HeroProps {
  profile: Profile;
  settings: SiteSettings;
}

export default function Hero({ profile, settings }: HeroProps) {
  const [currentRole, setCurrentRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    let charIndex = isDeleting ? currentRole.length : currentRole.length;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const fullText = settings.heroRoles[roleIndex];

      if (!isDeleting) {
        if (charIndex < fullText.length) {
          setCurrentRole(fullText.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, 80);
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true);
            type();
          }, 2000);
        }
      } else {
        if (charIndex > 0) {
          setCurrentRole(fullText.slice(0, charIndex - 1));
          charIndex--;
          timeout = setTimeout(type, 40);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % settings.heroRoles.length);
        }
      }
    };

    timeout = setTimeout(type, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [roleIndex, isDeleting, currentRole.length, settings.heroRoles]);

  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px]" />

      <div className="absolute inset-0 opacity-[0.03] text-primary" style={{
        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <HeroCodeDecorations />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8 mt-4 md:mt-0"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-accent text-sm font-medium">Available for work</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-accent font-semibold text-lg mb-4 tracking-wide"
          >
            {settings.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-[2.5rem] sm:text-6xl md:text-8xl font-bold text-primary mb-2 leading-tight break-words"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center md:justify-start gap-3 mb-8"
          >
            <span className="text-xl sm:text-2xl md:text-4xl text-secondary font-light">{currentRole}</span>
            <span className="text-xl sm:text-2xl md:text-4xl text-accent animate-pulse">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-secondary text-base sm:text-lg md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 bg-accent text-background px-5 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base hover:bg-accent-hover transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-105 cursor-pointer"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base border border-border text-primary hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
            >
              Contact Me
            </Link>
          </motion.div>

          {settings.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border"
            >
              {settings.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <ArrowRight className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-secondary text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
