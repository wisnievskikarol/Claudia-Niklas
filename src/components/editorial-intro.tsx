"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface EditorialIntroProps {
  quote?: string;
  image?: string;
  imageAlt?: string;
}

// Animation variants
const textRevealVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Word-by-word animation for emotional quote
function AnimatedQuote({ text }: { text: string }) {
  return (
    <motion.blockquote
      className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl text-editorial-charcoal text-center leading-relaxed max-w-4xl mx-auto px-2"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <span className="text-editorial-gold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none">
        "
      </span>
      {text}
      <span className="text-editorial-gold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none">
        "
      </span>
    </motion.blockquote>
  );
}

// Editorial image with parallax
function EditorialImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y, scale }}
        >
          <Image
            src={src}
            fill
            className="object-cover object-center image-editorial"
            alt={alt}
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </motion.div>

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-cream/5 via-transparent to-editorial-cream/5 pointer-events-none" />
      </div>
    </motion.div>
  );
}

// Decorative ornament - static for performance
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-6 py-8">
      <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-editorial-stone/30 to-editorial-stone/30" />
      <div className="w-2 h-2 rotate-45 border border-editorial-stone/30" />
      <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent via-editorial-stone/30 to-editorial-stone/30" />
    </div>
  );
}

export function EditorialIntro({
  quote = "Każda wielka miłość zaczyna się od małego kroku. Oto początek naszej wspólnej drogi.",
  image,
  imageAlt = "Para młoda",
}: EditorialIntroProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4 md:px-6 bg-editorial-cream">
      <div className="container-editorial">
        {/* Ornament top */}
        <Ornament />

        {/* Emotional quote */}
        <div className="py-12 md:py-20 px-4">
          <AnimatedQuote text={quote} />
        </div>

        {/* Ornament bottom */}
        <Ornament />

        {/* Full-width image if provided */}
        {image && (
          <div className="mt-12 md:mt-20">
            <EditorialImage src={image} alt={imageAlt} />
          </div>
        )}
      </div>
    </section>
  );
}

export default EditorialIntro;
