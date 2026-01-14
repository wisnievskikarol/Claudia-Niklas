"use client";

import { ScheduleProps } from "@/app/types";
import { Typography } from "@material-tailwind/react";
import ScheduleItem from "./schedule-item";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CustomStyleProps {
  sectionClass?: string;
  overlayClass?: string;
  contentClass?: string;
  backgroundImage?: string;
}

type Props = ScheduleProps & { customStyle?: CustomStyleProps };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function Schedule({ items, customStyle }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background effect
      if (customStyle?.backgroundImage) {
        gsap.to(".schedule-bg", {
          y: 100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Header reveal with elegant fade
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: -50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Staggered timeline items with sophisticated entrance
      const timelineItems = gsap.utils.toArray(".schedule-item-wrapper");
      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item as HTMLElement,
          {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            rotateY: index % 2 === 0 ? -15 : 15,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Divider lines animated growth
      const dividers = gsap.utils.toArray(".schedule-divider");
      dividers.forEach((divider) => {
        gsap.fromTo(
          divider as HTMLElement,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: divider as HTMLElement,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [customStyle?.backgroundImage]);

  return (
    <section
      ref={sectionRef}
      id="harmonogram"
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
      style={{ position: "relative", width: "100%", overflow: "hidden" }}
    >
      {/* Background image */}
      {customStyle?.backgroundImage && (
        <div
          className="schedule-bg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundImage: `url(${customStyle.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: 0.2,
          }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/80 via-black/75 to-black/80 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <Typography
            variant="h2"
            className="font-light font-Bellefair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight"
          >
            Plan uroczystości
          </Typography>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-white/40" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="w-full max-w-2xl mx-auto px-2 sm:px-4"
        >
          {/* Timeline items */}
          <motion.div
            className="space-y-8 sm:space-y-12 md:space-y-16 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex justify-center schedule-item-wrapper"
                variants={itemVariants}
                style={{ perspective: "1000px" }}
              >
                {/* Content with divider line */}
                <div className="flex flex-col items-center w-full">
                  {index > 0 && (
                    <div className="schedule-divider w-0.5 h-8 md:h-10 bg-gradient-to-b from-white/40 via-white/15 to-transparent" />
                  )}
                  <ScheduleItem
                    title={item.title}
                    description={item.description}
                    type={item.type}
                  />
                  {index < items.length - 1 && (
                    <div className="schedule-divider w-0.5 h-8 md:h-10 bg-gradient-to-b from-transparent via-white/15 to-white/40" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
