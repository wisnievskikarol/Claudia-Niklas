"use client";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import HeroInfoBox from "./hero-info-box";
import { motion } from "framer-motion";
import {
  HeroContentProps,
  HeroImageProps,
  HeroHorizontalProps,
} from "@/app/types";

function HeroContent({
  title,
  subtitle,
  address,
  date,
  time,
}: HeroContentProps) {
  return (
    <motion.div
      className="z-10 flex text-secondary flex-col gap-y-3 sm:gap-y-4 md:gap-y-6 justify-center px-3 sm:px-6 md:px-8 lg:px-16 lg:py-16 text-center lg:text-left mt-8 sm:mt-12 md:mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Typography
        variant="h1"
        className="mb-2 font-Bellefair font-normal text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-center sm:text-center tracking-tight"
      >
        {title}
      </Typography>
      <Typography className="mb-6 text-center text-sm sm:text-base md:text-lg lg:text-xl text-secondary/80 font-light">
        {subtitle}
      </Typography>
      <motion.div
        className="flex mb-8 justify-center"
        data-info-box
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <HeroInfoBox address={address} date={date} time={time} />
      </motion.div>
    </motion.div>
  );
}

function HeroImage({ imageSrc, altText }: HeroImageProps) {
  return (
    <motion.div
      className="z-10 w-full relative flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: "600px",
        maxHeight: "900px",
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      <Image
        src={imageSrc}
        fill
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          filter: "brightness(0.95)",
        }}
        alt={altText}
        priority
      />
      {/* Subtle overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          background:
            "linear-gradient(180deg,rgba(255,255,255,0.05) 0%,rgba(0,0,0,0.1) 100%)",
          pointerEvents: "none",
        }}
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
      className="mt-12 md:mt-24 px-2 overflow-hidden scroll-mt-24"
    >
      <div className="container mx-auto flex flex-col items-center text-center gap-y-4">
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
