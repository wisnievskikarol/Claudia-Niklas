"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface EventDetail {
  icon: "calendar" | "clock" | "location" | "dress";
  label: string;
  value: string;
}

interface EditorialDetailsProps {
  title?: string;
  subtitle?: string;
  details: EventDetail[];
}

// Minimalist line icons
const icons = {
  calendar: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <rect x="4" y="6" width="24" height="22" rx="2" />
      <line x1="4" y1="12" x2="28" y2="12" />
      <line x1="10" y1="3" x2="10" y2="8" />
      <line x1="22" y1="3" x2="22" y2="8" />
    </svg>
  ),
  clock: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="16" cy="16" r="12" />
      <polyline points="16,8 16,16 22,16" />
    </svg>
  ),
  location: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M16 3C11 3 7 7 7 12c0 7 9 17 9 17s9-10 9-17c0-5-4-9-9-9z" />
      <circle cx="16" cy="12" r="3" />
    </svg>
  ),
  dress: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 4h8l2 8-6 4-6-4 2-8z" />
      <path d="M8 16l-2 12h20l-2-12" />
      <line x1="16" y1="12" x2="16" y2="28" />
    </svg>
  ),
};

// Single detail card with reveal animation
function DetailCard({ detail, index }: { detail: EventDetail; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center p-4 sm:p-6 md:p-8 lg:p-12"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {/* Icon */}
      <motion.div
        className="text-editorial-stone/60 mb-3 sm:mb-4 md:mb-6 scale-75 sm:scale-90 md:scale-100"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.15 + 0.2,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {icons[detail.icon]}
      </motion.div>

      {/* Label */}
      <motion.span
        className="font-clean text-[10px] sm:text-xs tracking-widest uppercase text-editorial-muted mb-1 sm:mb-2 md:mb-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
      >
        {detail.label}
      </motion.span>

      {/* Value */}
      <motion.span
        className="font-editorial text-base sm:text-lg md:text-xl lg:text-2xl text-editorial-charcoal"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.15 + 0.4,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {detail.value}
      </motion.span>
    </motion.div>
  );
}

// Animated divider line
function VerticalDivider({ delay }: { delay: number }) {
  return (
    <motion.div
      className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-editorial-border to-transparent self-center"
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    />
  );
}

export function EditorialDetails({
  title = "Szczegóły uroczystości",
  subtitle,
  details,
}: EditorialDetailsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4 md:px-6 bg-editorial-ivory"
    >
      <div className="container-editorial">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-editorial-charcoal mb-2 sm:mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="font-clean text-sm sm:text-base text-editorial-stone max-w-xl mx-auto px-4">
              {subtitle}
            </p>
          )}

          {/* Decorative element */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-12 h-px bg-editorial-stone/20" />
            <div className="w-1 h-1 rounded-full bg-editorial-stone/40" />
            <div className="w-12 h-px bg-editorial-stone/20" />
          </motion.div>
        </motion.div>

        {/* Details grid */}
        <div className="flex flex-wrap justify-center">
          {details.map((detail, index) => (
            <div key={index} className="flex items-stretch">
              <DetailCard detail={detail} index={index} />
              {index < details.length - 1 && (
                <VerticalDivider delay={index * 0.15 + 0.3} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EditorialDetails;
