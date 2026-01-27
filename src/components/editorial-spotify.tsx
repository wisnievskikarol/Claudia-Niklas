"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface EditorialSpotifyProps {
  title?: string;
  subtitle?: string;
  playlistUrl: string;
  ctaText?: string;
  ctaUrl?: string;
}

// Section title component
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-8 sm:mb-12 md:mb-16"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Decorative element */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="w-8 sm:w-12 h-px bg-editorial-gold" />
        <svg
          className="w-5 h-5 text-editorial-gold"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
        <span className="w-8 sm:w-12 h-px bg-editorial-gold" />
      </motion.div>

      <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-charcoal mb-3 sm:mb-4">
        {title}
      </h2>
      <p className="font-clean text-sm sm:text-base text-editorial-stone tracking-wide max-w-xl mx-auto px-4">
        {subtitle}
      </p>
    </motion.div>
  );
}

// Spotify embed component
function SpotifyEmbed({ playlistUrl }: { playlistUrl: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Decorative frame */}
      <div className="absolute -inset-3 sm:-inset-4 border border-editorial-border rounded-2xl pointer-events-none" />

      {/* Spotify iframe */}
      <div className="relative bg-editorial-cream rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={playlistUrl}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
          style={{ borderRadius: "12px" }}
        />
      </div>
    </motion.div>
  );
}

// Call to action button
function SpotifyCta({ text, url }: { text: string; url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  return (
    <motion.div
      ref={ref}
      className="text-center mt-8 sm:mt-10 md:mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-editorial-charcoal text-editorial-charcoal font-clean text-xs sm:text-sm tracking-widest uppercase hover:bg-editorial-charcoal hover:text-editorial-cream transition-all duration-500 rounded-full"
      >
        {/* Spotify icon */}
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span>{text}</span>
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </a>

      <p className="font-clean text-xs sm:text-sm text-editorial-muted mt-4 max-w-md mx-auto px-4">
        Otwórz playlistę w Spotify i dodaj swoje ulubione utwory
      </p>
    </motion.div>
  );
}

export function EditorialSpotify({
  title = "Nasza playlista",
  subtitle = "Pomóż nam stworzyć idealną playlistę na nasz wielki dzień",
  playlistUrl,
  ctaText = "Dodaj piosenkę",
  ctaUrl,
}: EditorialSpotifyProps) {
  // Extract playlist ID for the direct Spotify link
  const playlistId = playlistUrl.match(/playlist\/([a-zA-Z0-9]+)/)?.[1] || "";
  const spotifyDirectUrl =
    ctaUrl || `https://open.spotify.com/playlist/${playlistId}`;

  return (
    <section
      id="spotify"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-editorial-cream scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader title={title} subtitle={subtitle} />
        <SpotifyEmbed playlistUrl={playlistUrl} />
        <SpotifyCta text={ctaText} url={spotifyDirectUrl} />
      </div>
    </section>
  );
}

export default EditorialSpotify;
