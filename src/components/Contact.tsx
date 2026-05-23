"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, MessageCircle, Clock, Heart } from "lucide-react";
import { Profile } from "@/lib/data";
import type { SiteSettings } from "@/lib/data";
import Link from "next/link";

interface ContactProps {
  profile: Profile;
  settings: SiteSettings;
}

export default function Contact({ profile, settings }: ContactProps) {
  return (
    <section className="section-padding bg-gradient-to-b from-surface/50 to-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6"
          >
            <MessageCircle className="text-accent" size={16} />
            <span className="text-accent text-sm font-medium">Let&apos;s Connect</span>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            {settings.contactHeading}
          </h2>
          <p className="text-secondary text-lg md:text-xl mb-10 leading-relaxed">
            {settings.contactText}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <Link
              href="/contact"
                className="group inline-flex items-center gap-3 bg-accent text-background px-6 sm:px-10 py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-accent-hover transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:scale-105 cursor-pointer max-w-full"
              >
                <Mail size={24} className="flex-shrink-0" />
                <span className="truncate">{profile.email}</span>
                <ArrowRight size={24} className="flex-shrink-0 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Clock, title: "Quick Response", desc: "Usually respond within 24 hours" },
              { icon: MessageCircle, title: "Open to Ideas", desc: "Let's discuss your vision" },
              { icon: Heart, title: "Quality Work", desc: "Committed to excellence" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-accent/30 transition-all duration-300 cursor-pointer hover:bg-surface/80"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <item.icon className="text-accent" size={24} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
