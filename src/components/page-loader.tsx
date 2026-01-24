"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Detect Safari in useEffect to avoid hydration mismatch
    const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(safari);

    // Very short timeout - just wait for hydration
    const loadTime = safari ? 300 : 800;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadTime);

    // Also hide on page fully loaded
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Don't render anything on server or if not mounted - prevents hydration issues
  if (typeof window === "undefined" || !isMounted) return null;

  // Simplified loader for Safari - no complex blur animations
  if (isSafari) {
    return (
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            data-loader
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-editorial-cream"
          >
            <div className="flex flex-col items-center gap-6">
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-editorial-charcoal tracking-[-0.02em] leading-[0.9]">
                Claudia & Niklas
              </h1>
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-editorial-stone/30" />
                <div className="w-1 h-1 rounded-full bg-editorial-stone/40" />
                <div className="w-12 h-px bg-editorial-stone/30" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          data-loader
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-editorial-cream overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-editorial-champagne/50 blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-editorial-sand/40 blur-[100px]"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Title with elegant reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-editorial-charcoal tracking-[-0.02em] leading-[0.9]">
                Claudia & Niklas
              </h1>
            </motion.div>

            {/* Elegant divider */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                className="h-px bg-editorial-stone/30"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1, delay: 1, ease: [0.23, 1, 0.32, 1] }}
              />
              <motion.div
                className="w-1 h-1 rounded-full bg-editorial-stone/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="h-px bg-editorial-stone/30"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1, delay: 1, ease: [0.23, 1, 0.32, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
