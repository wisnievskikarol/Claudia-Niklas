"use client";

import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "@/app/provider";

type SupportedLang = "pl" | "de";

const NAV_LINKS: Record<SupportedLang, { label: string; href: string }[]> = {
  pl: [
    { label: "Harmonogram", href: "#harmonogram" },
    { label: "RSVP", href: "#rsvp" },
  ],
  de: [
    { label: "Ablauf", href: "#harmonogram" },
    { label: "RSVP", href: "#rsvp" },
  ],
};

interface EditorialNavbarProps {
  coupleNames?: string;
  links?: { label: string; href: string }[];
}

export function EditorialNavbar({
  coupleNames = "C & N",
  links,
}: EditorialNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useContext(LanguageContext);
  const currentLang: SupportedLang = lang === "de" ? "de" : "pl";
  const navLinks = links ?? NAV_LINKS[currentLang];

  function LanguageToggle({ isMobile = false }: { isMobile?: boolean }) {
    const baseBtn =
      "px-3 py-1 text-[11px] tracking-[0.15em] uppercase rounded-full border transition-colors duration-300";
    const wrapperClass = isMobile
      ? "mt-6 flex items-center justify-center gap-3"
      : "hidden md:flex items-center gap-3";

    return (
      <div className={wrapperClass}>
        <button
          type="button"
          aria-pressed={currentLang === "pl"}
          className={`${baseBtn} ${
            currentLang === "pl"
              ? "bg-editorial-charcoal text-editorial-cream border-editorial-charcoal"
              : "border-editorial-stone text-editorial-charcoal hover:bg-editorial-stone/60"
          }`}
          onClick={() => setLang("pl")}
        >
          PL
        </button>
        <button
          type="button"
          aria-pressed={currentLang === "de"}
          className={`${baseBtn} ${
            currentLang === "de"
              ? "bg-editorial-charcoal text-editorial-cream border-editorial-charcoal"
              : "border-editorial-stone text-editorial-charcoal hover:bg-editorial-stone/60"
          }`}
          onClick={() => setLang("de")}
        >
          DE
        </button>
      </div>
    );
  }

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
            ? "bg-editorial-cream/90 backdrop-blur-sm"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 px-4 sm:px-6 md:px-8 lg:px-16">
            {/* Logo / Couple names */}
            <a
              href="#hero"
              className="font-editorial text-base sm:text-lg md:text-xl text-editorial-charcoal hover:text-editorial-stone transition-colors duration-300"
            >
              {coupleNames}
            </a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-clean text-[11px] tracking-[0.15em] uppercase text-editorial-stone hover:text-editorial-charcoal transition-colors duration-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <LanguageToggle />
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
              {navLinks.map((link, index) => (
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
              <LanguageToggle isMobile />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default EditorialNavbar;
