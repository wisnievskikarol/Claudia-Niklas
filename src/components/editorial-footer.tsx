"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface EditorialFooterProps {
  coupleNames?: string;
  date?: string;
}

export function EditorialFooter({
  coupleNames = "C & N",
  date = "2026",
}: EditorialFooterProps) {
  return (
    <footer className="bg-editorial-cream border-t border-editorial-stone/10 py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-6">
      <div className="container-editorial">
        {/* Subtle divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-editorial-stone/20" />
          <div className="w-1 h-1 rounded-full bg-editorial-stone/30" />
          <div className="w-8 h-px bg-editorial-stone/20" />
        </motion.div>

        {/* Couple names */}
        <motion.p
          className="text-center font-editorial text-lg sm:text-xl text-editorial-stone/60 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {coupleNames}
        </motion.p>

        {/* Year */}
        <motion.p
          className="text-center font-clean text-[10px] tracking-[0.3em] uppercase text-editorial-stone/40 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {date}
        </motion.p>

        {/* GoWedding logo */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <a
            href="https://www.gowedding.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 opacity-40 hover:opacity-60 transition-opacity duration-300"
          >
            <span className="font-clean text-[9px] tracking-[0.15em] uppercase text-editorial-stone/50 group-hover:text-editorial-stone/70 transition-colors">
              Powered by
            </span>
            <Image
              src="/logos/goweddingLogo_cale.svg"
              alt="GoWedding"
              width={80}
              height={52}
            />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

export default EditorialFooter;
