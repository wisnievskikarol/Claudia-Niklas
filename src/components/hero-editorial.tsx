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
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

// Letter animation for hero title - more dramatic
const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1.2,
      delay: i * 0.04,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

// Animated title with letter-by-letter reveal
function AnimatedTitle({ title }: { title: string }) {
  const names = title.split(" & ");

  return (
    <motion.div
      className="text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {names.length === 2 ? (
        <>
          {/* First name */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-editorial text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] text-editorial-charcoal leading-[0.85] tracking-[-0.02em]"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {names[0]}
            </motion.h1>
          </div>

          {/* Ampersand with decorative lines */}
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-8 my-2 sm:my-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="h-px bg-editorial-stone/40"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 1.2, delay: 1, ease: [0.23, 1, 0.32, 1] }}
            />
            <span className="font-editorial text-2xl sm:text-3xl md:text-4xl text-editorial-stone italic">
              &
            </span>
            <motion.div
              className="h-px bg-editorial-stone/40"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 1.2, delay: 1, ease: [0.23, 1, 0.32, 1] }}
            />
          </motion.div>

          {/* Second name */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-editorial text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] text-editorial-charcoal leading-[0.85] tracking-[-0.02em]"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {names[1]}
            </motion.h1>
          </div>
        </>
      ) : (
        <motion.h1
          className="font-editorial text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] text-editorial-charcoal leading-[0.9] tracking-[-0.02em]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {title}
        </motion.h1>
      )}
    </motion.div>
  );
}

// Date display component - refined layout
function DateDisplay({ date, time }: { date: Date; time: string }) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("pl-PL", { month: "long" });
  const year = dateObj.getFullYear();

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-baseline justify-center gap-2 sm:gap-3 md:gap-4">
        <span className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-charcoal leading-none">
          {day}
        </span>
        <span className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-stone/40">
          /
        </span>
        <span className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-charcoal capitalize">
          {month}
        </span>
        <span className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-stone/40">
          /
        </span>
        <span className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-charcoal">
          {year}
        </span>
      </div>
      <motion.div
        className="font-clean text-xs sm:text-sm tracking-[0.3em] uppercase text-editorial-stone mt-3 sm:mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        godz. {time}
      </motion.div>
    </motion.div>
  );
}

// Hero image with parallax effect - larger and more impactful
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

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);

  return (
    <motion.div
      ref={imageRef}
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Frame decoration */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-editorial-charcoal/20" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r border-t border-editorial-charcoal/20" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l border-b border-editorial-charcoal/20" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-editorial-charcoal/20" />
      </div>

      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/2] lg:aspect-[16/9] overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y, scale }}
        >
          <Image
            src={imageSrc}
            fill
            className="object-cover object-center"
            alt={altText}
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Elegant vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-cream/30 via-transparent to-editorial-cream/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-editorial-cream/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

// Scroll indicator - more subtle
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="w-px h-8 sm:h-12 bg-gradient-to-b from-editorial-charcoal/60 to-transparent"
        animate={{
          scaleY: [1, 0.5, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 2.5,
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
        y: 150,
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
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden bg-editorial-cream"
    >
      {/* Ambient background elements */}
      <div className="hero-ambient absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] rounded-full bg-editorial-champagne/30 blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[30rem] h-[30rem] rounded-full bg-editorial-sand/30 blur-[120px]" />
      </div>

      {/* Top section with text content */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
            {/* Overline - wedding invitation */}
            <motion.p
              className="font-clean text-[10px] sm:text-xs tracking-[0.3em] uppercase text-editorial-stone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              Zaproszenie ślubne
            </motion.p>

            {/* Main title - Names */}
            <AnimatedTitle title={content.title} />

            {/* Date display */}
            <DateDisplay date={content.date} time={content.time} />

            {/* Location */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="font-clean text-xs sm:text-sm tracking-[0.15em] uppercase text-editorial-stone/80">
                {content.address}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-width hero image at bottom */}
      <div className="relative z-10 w-full">
        <HeroImage imageSrc={heroImage.imageSrc} altText={heroImage.altText} />
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </header>
  );
}

export default HeroEditorial;
