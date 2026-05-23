"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logo, setLogo] = useState("AM");

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data.logo) setLogo(data.logo);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 rounded-2xl ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border border-border shadow-lg shadow-black/10"
            : "bg-transparent border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6">
          <Link
            href="/"
            className="font-heading text-xl font-semibold text-primary hover:text-accent transition-colors duration-300 cursor-pointer"
          >
            {logo}
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-accent bg-accent/10"
                      : "text-secondary hover:text-primary hover:bg-surface"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 border border-accent/30 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden text-primary w-11 h-11 flex items-center justify-center rounded-lg hover:bg-surface transition-colors duration-300 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.2 }}
            className="max-w-6xl mx-auto mt-2 md:hidden bg-surface/95 backdrop-blur-xl border border-border rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 min-h-[44px] flex items-center rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-accent bg-accent/10"
                        : "text-secondary hover:text-primary hover:bg-surface-hover"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
