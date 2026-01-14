"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EditorialNavbarProps {
  coupleNames?: string;
  links?: { label: string; href: string }[];
}

export function EditorialNavbar({
  coupleNames = "C & N",
  links = [
    { label: "Start", href: "#hero" },
    { label: "Harmonogram", href: "#harmonogram" },
    { label: "RSVP", href: "#rsvp" },
  ],
}: EditorialNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-editorial-cream/95 backdrop-blur-sm shadow-editorial"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-24 px-3 sm:px-4 md:px-6 lg:px-12">
            {/* Logo / Couple names */}
            <a
              href="#hero"
              className="font-editorial text-lg sm:text-xl md:text-2xl text-editorial-charcoal hover:text-editorial-graphite transition-colors duration-300"
            >
              {coupleNames}
            </a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-clean text-editorial-caption text-editorial-charcoal hover:text-editorial-stone transition-colors duration-300 relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-editorial-charcoal group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-px bg-editorial-charcoal"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 3.5 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-px bg-editorial-charcoal"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-px bg-editorial-charcoal"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -3.5 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-editorial-cream flex items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-6 sm:gap-8">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-editorial text-2xl sm:text-3xl text-editorial-charcoal py-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default EditorialNavbar;
