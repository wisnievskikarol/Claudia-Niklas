"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface EditorialCountdownProps {
  weddingDate: string; // Format: YYYY-MM-DD
  title?: string;
  subtitle?: string;
  timeLabels?: {
    day: string;
    dayPlural: string;
    hour: string;
    hourPlural: string;
    minute: string;
    minutePlural: string;
  };
}

interface TimeUnit {
  value: number;
  label: string;
  labelPlural: string;
}

// Animated number with flip effect
function CountdownNumber({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Animate number counting up
    const duration = 2000;
    const startTime = Date.now();
    const endValue = value;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setDisplayValue(Math.floor(eased * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(animate, delay);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 1,
        delay: delay / 1000,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <span className="font-editorial text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-none text-editorial-charcoal tabular-nums">
        {displayValue.toString().padStart(2, "0")}
      </span>
    </motion.div>
  );
}

// Single time unit display
function TimeUnitDisplay({ unit, index }: { unit: TimeUnit; index: number }) {
  const label = unit.value === 1 ? unit.label : unit.labelPlural;

  return (
    <div className="flex flex-col items-center">
      <CountdownNumber value={unit.value} delay={index * 150} />
      <motion.span
        className="font-clean text-[9px] sm:text-[10px] md:text-xs tracking-wider uppercase text-editorial-stone mt-1 sm:mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
      >
        {label}
      </motion.span>
    </div>
  );
}

// Elegant separator between units
function TimeSeparator({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-3 px-1 sm:px-4 md:px-6 mt-2 sm:mt-4"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.4, delay: delay * 0.5 }}
    >
      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-editorial-stone/30" />
    </motion.div>
  );
}

export function EditorialCountdown({
  weddingDate,
  title = "Odliczamy",
  subtitle = "dni do naszego wielkiego dnia",
  timeLabels,
}: EditorialCountdownProps) {
  const labels = timeLabels ?? {
    day: "dzień",
    dayPlural: "dni",
    hour: "godzina",
    hourPlural: "godzin",
    minute: "minuta",
    minutePlural: "minut",
  };
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: labels.day, labelPlural: labels.dayPlural },
    { value: 0, label: labels.hour, labelPlural: labels.hourPlural },
    { value: 0, label: labels.minute, labelPlural: labels.minutePlural },
  ]);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "100px" });

  const calculateTimeLeft = () => {
    const difference = +new Date(weddingDate) - +new Date();

    if (difference > 0) {
      return [
        {
          value: Math.floor(difference / (1000 * 60 * 60 * 24)),
          label: labels.day,
          labelPlural: labels.dayPlural,
        },
        {
          value: Math.floor((difference / (1000 * 60 * 60)) % 24),
          label: labels.hour,
          labelPlural: labels.hourPlural,
        },
        {
          value: Math.floor((difference / 1000 / 60) % 60),
          label: labels.minute,
          labelPlural: labels.minutePlural,
        },
      ];
    }

    return [
      { value: 0, label: labels.day, labelPlural: labels.dayPlural },
      { value: 0, label: labels.hour, labelPlural: labels.hourPlural },
      { value: 0, label: labels.minute, labelPlural: labels.minutePlural },
    ];
  };

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [
    weddingDate,
    labels.day,
    labels.dayPlural,
    labels.hour,
    labels.hourPlural,
    labels.minute,
    labels.minutePlural,
  ]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 bg-editorial-linen overflow-hidden"
    >
      <div className="container-editorial-narrow">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="font-clean text-[10px] sm:text-xs tracking-widest uppercase text-editorial-muted block mb-3 sm:mb-4">
            {title}
          </span>

          {/* Decorative element */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-8 h-px bg-editorial-stone/20" />
            <div className="w-1.5 h-1.5 rotate-45 border border-editorial-stone/30" />
            <div className="w-8 h-px bg-editorial-stone/20" />
          </motion.div>
        </motion.div>

        {/* Countdown grid */}
        <div className="flex flex-wrap justify-center items-start gap-2 sm:gap-4 md:gap-0">
          {timeLeft.map((unit, index) => (
            <div key={unit.label} className="flex items-start">
              <TimeUnitDisplay unit={unit} index={index} />
              {index < timeLeft.length - 1 && (
                <TimeSeparator delay={0.3 + index * 0.1} />
              )}
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-clean text-editorial-body text-editorial-stone text-center mt-12 md:mt-16 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}

export default EditorialCountdown;
