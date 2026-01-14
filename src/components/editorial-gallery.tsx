"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}

interface EditorialGalleryProps {
  images: GalleryImage[];
  layout?: "grid" | "stacked" | "editorial";
}

// Single image component with parallax and reveal
function GalleryImage({
  image,
  index,
  layout,
}: {
  image: GalleryImage;
  index: number;
  layout: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.02, 1]);

  // Determine aspect ratio class
  const aspectClasses = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  };

  const aspectClass = aspectClasses[image.aspectRatio || "landscape"];

  // Alternating reveal directions for editorial feel
  const revealX = layout === "editorial" ? (index % 2 === 0 ? -60 : 60) : 0;

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden group"
      initial={{ opacity: 0, x: revealX, y: 80 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y, scale }}
        >
          <Image
            src={image.src}
            fill
            className="object-cover object-center image-editorial transition-all duration-700 group-hover:filter-none"
            alt={image.alt}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-editorial-charcoal/0 group-hover:bg-editorial-charcoal/5 transition-colors duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

// Stacked layout - images centered with varying widths
function StackedLayout({ images }: { images: GalleryImage[] }) {
  const widths = ["max-w-4xl", "max-w-5xl", "max-w-3xl", "max-w-6xl"];

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {images.map((image, index) => (
        <div
          key={index}
          className={`${widths[index % widths.length]} mx-auto w-full px-4`}
        >
          <GalleryImage image={image} index={index} layout="stacked" />
        </div>
      ))}
    </div>
  );
}

// Editorial layout - asymmetric grid with varying sizes
function EditorialLayout({ images }: { images: GalleryImage[] }) {
  return (
    <div className="space-y-8 md:space-y-16">
      {/* First row - full width */}
      {images[0] && (
        <div className="w-full">
          <GalleryImage
            image={{ ...images[0], aspectRatio: "landscape" }}
            index={0}
            layout="editorial"
          />
        </div>
      )}

      {/* Second row - two columns, offset */}
      {images.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
          {images[1] && (
            <div className="md:col-span-5 md:col-start-1">
              <GalleryImage
                image={{ ...images[1], aspectRatio: "portrait" }}
                index={1}
                layout="editorial"
              />
            </div>
          )}
          {images[2] && (
            <div className="md:col-span-6 md:col-start-7">
              <GalleryImage
                image={{ ...images[2], aspectRatio: "landscape" }}
                index={2}
                layout="editorial"
              />
            </div>
          )}
        </div>
      )}

      {/* Third row - centered large */}
      {images[3] && (
        <div className="max-w-5xl mx-auto">
          <GalleryImage
            image={{ ...images[3], aspectRatio: "landscape" }}
            index={3}
            layout="editorial"
          />
        </div>
      )}

      {/* Fourth row - three columns */}
      {images.length > 4 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {images.slice(4, 7).map((image, idx) => (
            <GalleryImage
              key={idx + 4}
              image={{ ...image, aspectRatio: "square" }}
              index={idx + 4}
              layout="editorial"
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Simple grid layout
function GridLayout({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {images.map((image, index) => (
        <GalleryImage key={index} image={image} index={index} layout="grid" />
      ))}
    </div>
  );
}

export function EditorialGallery({
  images,
  layout = "editorial",
}: EditorialGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="section-editorial-xl bg-editorial-cream"
    >
      <div className="container-editorial-wide px-4 md:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="font-clean text-editorial-overline text-editorial-muted block mb-4">
            Nasza historia
          </span>
          <h2 className="font-editorial text-editorial-h1 text-editorial-charcoal">
            Momenty
          </h2>
        </motion.div>

        {/* Gallery content */}
        {layout === "stacked" && <StackedLayout images={images} />}
        {layout === "editorial" && <EditorialLayout images={images} />}
        {layout === "grid" && <GridLayout images={images} />}
      </div>
    </section>
  );
}

export default EditorialGallery;
