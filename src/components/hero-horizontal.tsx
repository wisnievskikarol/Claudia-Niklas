"use client";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import HeroInfoBox from "./hero-info-box";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HeroContentProps,
  HeroImageProps,
  HeroHorizontalProps,
} from "@/app/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function HeroContent({
  title,
  subtitle,
  address,
  date,
  time,
}: HeroContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!contentRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Powerful title reveal
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      // Gentle floating for decorative elements
      gsap.to(".hero-blur-circle", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Info box entrance
      gsap.fromTo(
        ".hero-info-box",
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.6,
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={contentRef}
      className="relative z-10 flex flex-col items-center text-center px-3 sm:px-6 md:px-8 py-0 w-full"
    >
      {/* Decorative blur circles */}
      <div className="hero-blur-circle absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/15 blur-3xl -z-10" />
      <div className="hero-blur-circle absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/8 blur-3xl -z-10" />

      {/* Overline text */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-xs sm:text-sm tracking-[0.2em] uppercase font-light text-secondary/50 mb-4 sm:mb-6"
      >
        Zapraszamy na nasz wielki dzień
      </motion.p>

      {/* Main title */}
      <Typography
        ref={titleRef}
        variant="h1"
        className="font-Bellefair font-light text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-secondary tracking-tight leading-[0.95] mb-4 sm:mb-6 w-full"
      >
        {title}
      </Typography>

      {/* Elegant divider */}
      <motion.div
        className="flex items-center gap-3 mb-4 sm:mb-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-secondary/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
        <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-secondary/30" />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary/60 font-light italic max-w-2xl mb-6 sm:mb-10 md:mb-12"
      >
        {subtitle}
      </motion.p>

      {/* Info box */}
      <div className="hero-info-box relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/5 rounded-2xl blur-xl" />
        <HeroInfoBox address={address} date={date} time={time} />
      </div>
    </div>
  );
}

function HeroImage({ imageSrc, altText }: HeroImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on scroll
      gsap.to(imageRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, imageRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={imageRef}
      className="relative w-full sm:max-w-6xl sm:mx-auto"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="relative w-full aspect-[3/4] sm:aspect-[5/3] overflow-hidden rounded-none sm:rounded-2xl shadow-2xl group">
        {/* Subtle glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-none sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative w-full h-full overflow-hidden rounded-none sm:rounded-2xl">
          <Image
            src={imageSrc}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            style={{
              filter: "brightness(0.96) contrast(1.04) saturate(1.05)",
            }}
            alt={altText}
            priority
          />

          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/3 via-transparent to-transparent" />

          {/* Elegant border */}
          <div className="absolute inset-0 rounded-none sm:rounded-2xl border-0 sm:border border-secondary/10 group-hover:border-secondary/20 transition-colors duration-500" />
        </div>
      </div>
    </motion.div>
  );
}

export function HeroHorizontal({
  content,
  heroImage,
  backgroundImage,
}: HeroHorizontalProps) {
  return (
    <header
      id="miejsce"
      className="relative min-h-screen flex items-center px-0 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-20 md:pb-24 overflow-hidden scroll-mt-24 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent"
    >
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="w-full container mx-auto relative z-10 px-0">
        <div className="flex flex-col items-center gap-4 sm:gap-10 md:gap-14">
          <HeroContent
            title={content.title}
            subtitle={content.subtitle}
            address={content.address}
            date={content.date}
            time={content.time}
          />
          <HeroImage
            imageSrc={heroImage.imageSrc}
            altText={heroImage.altText}
          />
        </div>
      </div>
    </header>
  );
}

export default HeroHorizontal;
