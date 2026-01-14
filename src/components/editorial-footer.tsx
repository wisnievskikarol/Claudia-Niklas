"use client";

import { motion } from "framer-motion";

interface EditorialFooterProps {
  coupleNames?: string;
  date?: string;
}

export function EditorialFooter({
  coupleNames = "C & N",
  date = "2026",
}: EditorialFooterProps) {
  return (
    <footer className="bg-editorial-charcoal py-12 sm:py-16 md:py-20 lg:py-32 px-3 sm:px-4 md:px-6">
      <div className="container-editorial text-center">
        {/* Monogram */}
        <motion.div
          className="mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-editorial-cream/80">
            {coupleNames}
          </span>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-8 sm:w-12 h-px bg-editorial-cream/20" />
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-editorial-cream/30" />
          <div className="w-8 sm:w-12 h-px bg-editorial-cream/20" />
        </motion.div>

        {/* Date */}
        <motion.p
          className="font-clean text-[10px] sm:text-xs tracking-widest uppercase text-editorial-cream/40 mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {date}
        </motion.p>

        {/* Credits */}
        <motion.div
          className="pt-6 sm:pt-8 md:pt-12 border-t border-editorial-cream/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://www.gowedding.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 text-editorial-cream/30 hover:text-editorial-cream/50 transition-colors duration-300"
          >
            <span className="font-clean text-[10px] sm:text-xs tracking-wider uppercase">
              Stworzone z
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-clean text-xs tracking-wider uppercase">
              GoWedding
            </span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

export default EditorialFooter;
