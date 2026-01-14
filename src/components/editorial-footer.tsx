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
    <footer className="bg-editorial-charcoal py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6">
      <div className="container-editorial flex justify-center">
        <motion.a
          href="https://www.gowedding.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block opacity-30 hover:opacity-50 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/logos/gowedding-white.svg"
            alt="GoWedding"
            width={60}
            height={62}
            className="h-12 sm:h-14 w-auto"
          />
        </motion.a>
      </div>
    </footer>
  );
}

export default EditorialFooter;
