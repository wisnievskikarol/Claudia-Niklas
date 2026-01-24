"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroHorizontalProps } from "@/app/types";
import { LanguageContext } from "@/app/provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Refresh ScrollTrigger on Safari to fix viewport detection issues
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Animation variants for staggered reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.02,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

// Animated title with letter-by-letter reveal
function AnimatedTitle({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <motion.h1
      className="font-editorial text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem] text-editorial-charcoal leading-[0.9] tracking-[-0.02em] text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mx-[0.08em]">
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
        </span>
      ))}
    </motion.h1>
  );
}

// Date display component with elegant formatting
function DateDisplay({
  date,
  time,
  lang = "pl",
}: {
  date: Date;
  time: string;
  lang?: "pl" | "de";
}) {
  const locale = lang === "de" ? "de-DE" : "pl-PL";
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString(locale, { month: "long" });
  const year = dateObj.getFullYear();
  const timeLabel = lang === "de" ? `${time} Uhr` : `godz. ${time}`;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Decorative top line */}
      <motion.div
        className="w-16 h-px bg-editorial-stone/30 mb-6 sm:mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Date row - all elements same visual weight */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
        <span className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-charcoal leading-none">
          {day}
        </span>
        <span className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl text-editorial-stone/40 leading-none">
          /
        </span>
        <span className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-charcoal capitalize leading-none">
          {month}
        </span>
        <span className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl text-editorial-stone/40 leading-none">
          /
        </span>
        <span className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-charcoal leading-none">
          {year}
        </span>
      </div>

      {/* Time - centered below */}
      <div className="mt-4 sm:mt-6">
        <span className="font-clean text-[10px] sm:text-xs tracking-[0.3em] uppercase text-editorial-muted">
          {timeLabel}
        </span>
      </div>

      {/* Decorative bottom line */}
      <motion.div
        className="w-16 h-px bg-editorial-stone/30 mt-6 sm:mt-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      />
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
      className="relative w-screen -mx-4 sm:-mx-8 lg:w-full lg:-mx-0 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[5/3] overflow-hidden">
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

        {/* Bottom fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-editorial-charcoal/15 to-transparent pointer-events-none" />
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
      transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="font-clean text-[10px] tracking-[0.2em] uppercase text-editorial-charcoal font-medium">
        Scroll
      </span>
      <motion.div
        className="flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-px h-8 bg-editorial-charcoal" />
        <svg
          className="w-4 h-4 text-editorial-charcoal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Main Hero Component
export function HeroEditorial({ content, heroImage }: HeroHorizontalProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { lang } = useContext(LanguageContext);
  const overline = lang === "de" ? "Hochzeitseinladung" : "Zaproszenie ślubne";
  const hasSubtitle = Boolean(
    content.subtitle && content.subtitle.trim().length > 0,
  );

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
      className="relative min-h-screen flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-20 overflow-hidden bg-editorial-cream"
    >
      {/* Ambient background elements */}
      <div className="hero-ambient absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-editorial-champagne/50 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-editorial-sand/40 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col">
        {/* Top section - Overline & Title */}
        <div
          className={`flex flex-col items-center ${hasSubtitle ? "mb-8 sm:mb-10 md:mb-12" : "mb-10 sm:mb-12 md:mb-16"}`}
        >
          {/* Overline */}
          <motion.p
            className="font-clean text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-editorial-muted mb-4 sm:mb-5 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            {overline}
          </motion.p>

          {/* Main title - Names */}
          <AnimatedTitle title={content.title} />
        </div>

        {/* Middle section - Subtitle & Details in elegant grid */}
        {hasSubtitle && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-8 items-center mb-10 sm:mb-14 md:mb-20">
            {/* Left - decorative line */}
            <motion.div
              className="hidden lg:flex items-center justify-end"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="w-full max-w-[200px] h-px bg-gradient-to-l from-editorial-stone/30 to-transparent" />
            </motion.div>

            {/* Center - Subtitle */}
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <p className="font-clean text-sm sm:text-base md:text-lg text-editorial-stone italic leading-relaxed max-w-md">
                {content.subtitle}
              </p>
            </motion.div>

            {/* Right - decorative line */}
            <motion.div
              className="hidden lg:flex items-center justify-start"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-editorial-stone/30 to-transparent" />
            </motion.div>
          </div>
        )}

        {/* Date & Location section */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {/* Date display */}
          <DateDisplay
            date={content.date}
            time={content.time}
            lang={lang === "de" ? "de" : "pl"}
          />

          {/* Location with icon-like styling */}
          <motion.div
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-editorial-stone/10 bg-editorial-cream/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <svg
              className="w-3.5 h-3.5 text-editorial-stone/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="font-clean text-[10px] sm:text-xs tracking-[0.15em] uppercase text-editorial-stone">
              {content.address}
            </span>
          </motion.div>
        </div>

        {/* Hero image - full width with elegant framing */}
        <div className="w-full mt-auto pt-4 sm:pt-6 md:pt-8">
          <HeroImage
            imageSrc={heroImage.imageSrc}
            altText={heroImage.altText}
          />
        </div>
      </div>
    </header>
  );
}

export default HeroEditorial;
