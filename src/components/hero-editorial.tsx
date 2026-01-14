"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroHorizontalProps } from "@/app/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation variants for staggered reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Letter animation for hero title
const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.03,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

// Animated title with letter-by-letter reveal
function AnimatedTitle({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <motion.h1
      className="font-editorial text-[2.75rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] text-editorial-charcoal leading-[0.95] tracking-tight text-center px-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.2em]">
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              custom={wordIndex * 5 + letterIndex}
              variants={letterVariants}
              style={{ transformOrigin: "center bottom" }}
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.h1>
  );
}

// Elegant divider with animation
function EditorialDivider() {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 sm:gap-4 my-4 sm:my-6 md:my-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="h-px bg-editorial-stone/30"
        initial={{ width: 0 }}
        animate={{ width: 60 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.23, 1, 0.32, 1] }}
      />
      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-editorial-stone/40" />
      <motion.div
        className="h-px bg-editorial-stone/30"
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.23, 1, 0.32, 1] }}
      />
    </motion.div>
  );
}

// Date display component with elegant formatting
function DateDisplay({ date, time }: { date: Date; time: string }) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("pl-PL", { month: "long" });
  const year = dateObj.getFullYear();

  return (
    <motion.div
      className="text-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="font-clean text-editorial-overline text-editorial-muted mb-3 sm:mb-4 text-[10px] sm:text-xs">
        Zapraszamy Was
      </div>
      <div className="font-editorial text-editorial-charcoal flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
        <span className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] leading-none">
          {day}
        </span>
        <span className="hidden sm:inline mx-2 text-editorial-muted text-2xl md:text-3xl">
          /
        </span>
        <span className="capitalize text-xl sm:text-2xl md:text-3xl">
          {month}
        </span>
        <span className="hidden sm:inline mx-2 text-editorial-muted text-2xl md:text-3xl">
          /
        </span>
        <span className="text-lg sm:text-xl md:text-2xl text-editorial-stone">
          {year}
        </span>
      </div>
      <div className="font-clean text-editorial-caption text-editorial-stone mt-3 sm:mt-4 text-[10px] sm:text-xs">
        {time}
      </div>
    </motion.div>
  );
}

// Hero image with parallax effect
function HeroImage({
  imageSrc,
  altText,
}: {
  imageSrc: string;
  altText: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <motion.div
      ref={imageRef}
      className="relative w-full max-w-5xl mx-auto overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/2] overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y, scale }}
        >
          <Image
            src={imageSrc}
            fill
            className="object-cover object-center image-editorial"
            alt={altText}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </motion.div>

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-cream/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

// Scroll indicator
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="font-clean text-editorial-overline text-editorial-muted text-[10px]">
        Scroll
      </span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-editorial-charcoal to-transparent"
        animate={{
          scaleY: [1, 0.6, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Main Hero Component
export function HeroEditorial({ content, heroImage }: HeroHorizontalProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !isMounted) return;

    const ctx = gsap.context(() => {
      // Gentle parallax for background elements
      gsap.to(".hero-ambient", {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <header
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden bg-editorial-cream"
    >
      {/* Ambient background elements */}
      <div className="hero-ambient absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-editorial-champagne/50 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-editorial-sand/40 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6 sm:gap-10 md:gap-14 lg:gap-16">
          {/* Overline */}
          <motion.p
            className="font-clean text-editorial-overline text-editorial-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            Zaproszenie ślubne
          </motion.p>

          {/* Main title - Names */}
          <AnimatedTitle title={content.title} />

          {/* Elegant divider */}
          <EditorialDivider />

          {/* Emotional subtitle */}
          <motion.p
            className="font-clean text-sm sm:text-base md:text-lg text-editorial-stone text-center max-w-xl italic px-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            {content.subtitle}
          </motion.p>

          {/* Date display */}
          <DateDisplay date={content.date} time={content.time} />

          {/* Location */}
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="font-clean text-[10px] sm:text-xs tracking-wider uppercase text-editorial-stone">
              {content.address}
            </div>
          </motion.div>

          {/* Hero image */}
          <div className="w-full mt-4 sm:mt-8 md:mt-12 lg:mt-16">
            <HeroImage
              imageSrc={heroImage.imageSrc}
              altText={heroImage.altText}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </header>
  );
}

export default HeroEditorial;
