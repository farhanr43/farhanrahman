"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Profile } from "@/lib/data";
import type { SiteSettings } from "@/lib/data";
import Link from "next/link";

interface AboutProps {
  profile: Profile;
  settings: SiteSettings;
}

export default function About({ profile, settings }: AboutProps) {
  return (
    <section className="section-padding bg-surface/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
              <span className="text-accent text-sm font-semibold">About Me</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              {settings.aboutHeading}
              <span className="text-gradient"> {settings.aboutHighlight}</span>
            </h2>

            <p className="text-secondary text-lg md:text-xl leading-relaxed mb-8">
              {profile.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              {settings.aboutHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 sm:p-4 bg-background/50 rounded-xl border border-border/50 hover:border-accent/30 hover:bg-surface/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                    <ArrowRight className="text-accent" size={18} />
                  </div>
                  <span className="text-primary font-medium text-sm sm:text-sm break-words">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all cursor-pointer"
              >
                {settings.contactCtaText}
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-surface to-background border border-border rounded-3xl p-8 shadow-2xl hover:border-accent/20 transition-colors duration-300">
              <div className="flex flex-col items-center text-center mb-8">
                {profile.image ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-accent/50 ring-2 ring-accent/20 relative">
                    <Image src={profile.image} alt={profile.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center mb-4 ring-2 ring-accent/20">
                    <span className="text-4xl font-bold text-background">{profile.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
                <h3 className="font-bold text-2xl text-primary">{profile.name}</h3>
                <p className="text-accent font-medium">{profile.title}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-xl hover:bg-surface/50 transition-colors duration-300">
                  <span className="text-secondary text-sm">Email</span>
                  <span className="text-primary text-sm font-medium break-all">{profile.email}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-xl hover:bg-surface/50 transition-colors duration-300">
                  <span className="text-secondary text-sm">Status</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-success text-sm font-medium">Available</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
