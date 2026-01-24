"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
  type?: "ceremony" | "party" | "dinner" | "special";
}

interface EditorialScheduleProps {
  items: ScheduleItem[];
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

// Timeline item with elegant reveal
function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: ScheduleItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-4 sm:gap-6 md:gap-8 pb-6 sm:pb-8 md:pb-10 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {/* Timeline line */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <motion.div
          className="relative z-10 w-3 h-3 rounded-full bg-white border border-white/40"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
        />

        {/* Line */}
        {!isLast && (
          <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/40 to-white/10"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 + 0.3 }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 -mt-1">
        {/* Time */}
        <motion.span
          className="font-editorial text-xl sm:text-2xl md:text-3xl text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.08 + 0.2 }}
        >
          {item.time}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-clean text-sm sm:text-base md:text-lg text-white/90 mt-1 sm:mt-2 font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.08 + 0.3 }}
        >
          {item.title || item.description}
        </motion.h3>

        {/* Description if separate from title */}
        {item.title && item.description && (
          <motion.p
            className="font-clean text-sm text-white/70 mt-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 + 0.4 }}
          >
            {item.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export function EditorialSchedule({
  items,
  title = "Harmonogram dnia",
  subtitle = "Plan naszego wspólnego święta",
  backgroundImage,
}: EditorialScheduleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Split items into two columns for desktop
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midpoint);
  const rightItems = items.slice(midpoint);

  return (
    <section
      ref={sectionRef}
      id="harmonogram"
      className="relative  py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background image with overlay */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            fill
            className="object-cover object-center image-editorial"
            alt="Background"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}

      {/* Fallback dark background */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-editorial-charcoal" />
      )}

      <div className="relative z-10 container-editorial px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="font-clean text-[10px] sm:text-xs tracking-widest uppercase text-white/60 block mb-3 sm:mb-4">
            {subtitle}
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            {title}
          </h2>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-12 h-px bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <div className="w-12 h-px bg-white/30" />
          </motion.div>
        </motion.div>

        {/* Timeline grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 xl:gap-20 max-w-5xl mx-auto">
          {/* Left column */}
          <div>
            {leftItems.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLast={index === leftItems.length - 1}
              />
            ))}
          </div>

          {/* Right column */}
          <div>
            {rightItems.map((item, index) => (
              <TimelineItem
                key={index + midpoint}
                item={item}
                index={index + midpoint}
                isLast={index === rightItems.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorialSchedule;
