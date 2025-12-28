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
    <motion.div className="z-10 flex text-secondary flex-col gap-y-4 justify-center px-2 sm:px-4 md:px-8 lg:px-16 lg:py-16 text-center lg:text-left mt-16">
      <Typography
        variant="h1"
        className="mb-2 font-Bellefair font-normal text-4xl text-center sm:text-7xl"
      >
        {title}
      </Typography>
      <Typography className="mb-6 text-center">{subtitle}</Typography>
      <div className="flex mb-8 justify-center">
        <HeroInfoBox address={address} date={date} time={time} />
      </div>
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
        minHeight: "640px",
        maxHeight: "1000px",
        overflow: "hidden",
        borderRadius: "32px",
        /* Responsive: even taller on large screens */
      }}
      className="z-10 w-full relative flex justify-center items-center xl:min-h-[1000px] 2xl:min-h-[1200px]"
    >
      <Image
        src={imageSrc}
        fill
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "32px",
          filter: "brightness(0.92)",
        }}
        alt={altText}
        priority
      />
      {/* Gradient overlay for designer look */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "32px",
          background:
            "linear-gradient(180deg,rgba(255,255,255,0.08) 0%,rgba(0,0,0,0.18) 100%)",
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
    <header className="mt-12 md:mt-24 px-2 overflow-hidden">
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
