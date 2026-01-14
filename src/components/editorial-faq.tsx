"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface EditorialFaqProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

// Single FAQ accordion item
function FaqAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="border-b border-editorial-border last:border-b-0"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 sm:py-6 md:py-8 text-left group"
      >
        {/* Number */}
        <span className="font-clean text-[10px] sm:text-xs tracking-widest uppercase text-editorial-muted w-8 sm:w-12 flex-shrink-0">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        {/* Question */}
        <span className="font-editorial text-base sm:text-lg md:text-xl text-editorial-charcoal flex-1 pr-2 sm:pr-4 group-hover:text-editorial-graphite transition-colors duration-300">
          {item.question}
        </span>

        {/* Icon */}
        <motion.div
          className="w-8 h-8 flex items-center justify-center flex-shrink-0"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-editorial-stone"
          >
            <line x1="8" y1="0" x2="8" y2="16" />
            <line x1="0" y1="8" x2="16" y2="8" />
          </svg>
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-8 sm:pl-12 pr-4 sm:pr-12 pb-4 sm:pb-8">
              <p className="font-clean text-sm sm:text-base text-editorial-stone leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function EditorialFaq({
  items,
  title = "Często zadawane pytania",
  subtitle = "Wszystko, co musisz wiedzieć",
}: EditorialFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4 md:px-6 bg-editorial-cream"
    >
      <div className="container-editorial-narrow">
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

        {/* FAQ items */}
        <div className="border-t border-editorial-border">
          {items.map((item, index) => (
            <FaqAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EditorialFaq;
