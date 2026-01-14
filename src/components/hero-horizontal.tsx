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
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const infoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Elegant title reveal with split text effect
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
            letterSpacing: "-0.05em",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            letterSpacing: "0em",
            duration: 1.4,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      // Floating animation for decorative elements
      gsap.to(".hero-blur-circle", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Info box entrance with 3D effect
      if (infoBoxRef.current) {
        gsap.fromTo(
          infoBoxRef.current,
          {
            opacity: 0,
            y: 50,
            rotateX: 15,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
            delay: 0.8,
          }
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={contentRef}
      className="z-10 flex text-secondary flex-col gap-y-2 sm:gap-y-3 md:gap-y-5 justify-center px-3 sm:px-6 md:px-8 lg:px-16 lg:py-16 text-center lg:text-left mt-6 sm:mt-8 md:mt-12 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Decorative background elements with GSAP animation */}
      <motion.div
        className="hero-blur-circle absolute -top-10 -left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.1 }}
      />
      <motion.div
        className="hero-blur-circle absolute -bottom-20 -right-10 w-60 h-60 rounded-full bg-secondary/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      <motion.div
        initial={{ opacity: 0, letterSpacing: "-0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.05em" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-xs sm:text-sm tracking-widest uppercase font-light text-secondary/60"
      >
        Zapraszamy na nasz wielki dzień
      </motion.div>

      <Typography
        ref={titleRef}
        variant="h1"
        className="mb-2 sm:mb-3 font-Bellefair font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center sm:text-center tracking-tight leading-tight relative"
      >
        {title}
      </Typography>

      {/* Enhanced divider */}
      <motion.div
        className="flex items-center justify-center gap-3 my-4 sm:my-5 md:my-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="h-0.5 bg-gradient-to-r from-transparent to-secondary/40"
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        />
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-secondary/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        />
        <motion.div
          className="h-0.5 bg-gradient-to-l from-transparent to-secondary/40"
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        />
      </motion.div>

      <Typography
        ref={subtitleRef}
        className="mb-8 sm:mb-10 md:mb-12 text-center text-sm sm:text-base md:text-lg lg:text-xl text-secondary/70 font-light italic relative z-10"
      >
        {subtitle}
      </Typography>

      <motion.div
        ref={infoBoxRef}
        className="flex mb-8 sm:mb-10 md:mb-12 justify-center relative z-10"
        data-info-box
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ y: -5 }}
        style={{ perspective: "1000px" }}
      >
        <div className="relative">
          {/* Glow effect behind info box */}
          <motion.div
            className="absolute -inset-6 rounded-xl bg-gradient-to-r from-secondary/5 to-primary/5 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <div className="relative">
            <HeroInfoBox address={address} date={date} time={time} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroImage({ imageSrc, altText }: HeroImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Elegant zoom on hover
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(imageRef.current?.querySelector("img"), {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.out",
      });

      imageRef.current?.addEventListener("mouseenter", () => hoverTl.play());
      imageRef.current?.addEventListener("mouseleave", () => hoverTl.reverse());
    }, imageRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={imageRef}
      className="z-10 w-full relative flex justify-center items-center group"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        minHeight: "500px",
        maxHeight: "800px",
        overflow: "hidden",
        borderRadius: "24px",
      }}
    >
      {/* Subtle glow wrapper */}
      <motion.div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-secondary/20 via-secondary/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Image
        src={imageSrc}
        fill
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "24px",
          filter: "brightness(0.92) contrast(1.08)",
        }}
        alt={altText}
        priority
      />

      {/* Gradient overlay - top to bottom */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "24px",
          background:
            "linear-gradient(180deg, rgba(249,244,237,0.05) 0%, rgba(41,50,56,0.08) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Elegant border */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "24px",
          border: "1px solid rgba(41,50,56,0.15)",
          pointerEvents: "none",
        }}
        className="group-hover:border-secondary/30 transition-colors duration-300"
      />
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
      className="relative mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-2 overflow-hidden scroll-mt-24 py-8 sm:py-12 md:py-16"
    >
      {/* Decorative top elements */}
      <motion.div
        className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />

      <div className="container mx-auto flex flex-col items-center text-center gap-y-8 sm:gap-y-12 md:gap-y-14 relative z-10">
        <HeroContent
          title={content.title}
          subtitle={content.subtitle}
          address={content.address}
          date={content.date}
          time={content.time}
        />
        <HeroImage imageSrc={heroImage.imageSrc} altText={heroImage.altText} />
      </div>
    </header>
  );
}

export default HeroHorizontal;
