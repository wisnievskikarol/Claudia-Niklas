"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Hotel {
  name: string;
  description: string;
  distance?: string;
  link?: string;
}

interface EditorialHotelsProps {
  hotels: Hotel[];
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

// Hotel card with elegant reveal
function HotelCard({
  hotel,
  index,
  ctaLabel,
}: {
  hotel: Hotel;
  index: number;
  ctaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  return (
    <motion.div
      ref={ref}
      className="group h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div className="h-full p-5 sm:p-6 md:p-8 lg:p-10 border border-editorial-border bg-editorial-cream/50 hover:border-editorial-border-hover hover:bg-editorial-ivory transition-all duration-500 flex flex-col">
        {/* Number */}
        <span className="font-clean text-[10px] sm:text-xs tracking-widest uppercase text-editorial-muted block mb-2 sm:mb-4">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        {/* Name */}
        <h3 className="font-editorial text-lg sm:text-xl md:text-2xl text-editorial-charcoal mb-2 sm:mb-4 group-hover:text-editorial-graphite transition-colors duration-300">
          {hotel.name}
        </h3>

        {/* Description */}
        <p className="font-clean text-sm sm:text-base text-editorial-stone leading-relaxed mb-3 sm:mb-6">
          {hotel.description}
        </p>

        {/* Distance */}
        {hotel.distance && (
          <p className="font-clean text-xs sm:text-sm text-editorial-muted mb-3 sm:mb-6">
            {hotel.distance}
          </p>
        )}

        {/* Link */}
        {hotel.link && (
          <motion.a
            href={hotel.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 font-clean text-editorial-caption text-editorial-charcoal hover:text-editorial-stone transition-colors duration-300"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span>{ctaLabel}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

export function EditorialHotels({
  hotels,
  title = "Noclegi",
  subtitle = "Polecane przez nas miejsca",
  ctaLabel = "Rezerwuj",
}: EditorialHotelsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "100px" });

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4 md:px-6 bg-editorial-ivory"
    >
      <div className="container-editorial">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="font-clean text-[10px] sm:text-xs tracking-widest uppercase text-editorial-muted block mb-3 sm:mb-4">
            {subtitle}
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-editorial-charcoal">
            {title}
          </h2>

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

        {/* Hotels grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {hotels.map((hotel, index) => (
            <HotelCard
              key={index}
              hotel={hotel}
              index={index}
              ctaLabel={ctaLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EditorialHotels;
