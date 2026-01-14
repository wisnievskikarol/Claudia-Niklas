"use client";

import { RsvpButtonProps, RsvpHeaderProps, RsvpProps } from "@/app/types";
import { Button, Typography } from "@material-tailwind/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function RsvpHeader({ title, description }: RsvpHeaderProps) {
  return (
    <div className="flex flex-col text-secondary justify-center items-center gap-4 md:gap-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-20 h-20 text-secondary rsvp-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.972l-7.5 4.5a2.25 2.25 0 0 1-2.36 0l-7.5-4.5A2.25 2.25 0 0 1 3 6.993V6.75"
        />
      </svg>
      <div className="w-full flex flex-col justify-center items-center ">
        <Typography
          variant="h2"
          className="mb-4 font-normal font-Bellefair text-2xl sm:text-3xl md:text-4xl text-center"
        >
          {title}
        </Typography>
        <Typography
          variant="lead"
          className="text-center max-w-xl text-sm sm:text-base md:text-lg"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
}

function RsvpButton({ url }: RsvpButtonProps) {
  return (
    <div className="px-4 md:px-7 pt-8 sm:pt-4 rounded-lg flex justify-center items-center gap-2.5 rsvp-button">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button
          variant="outlined"
          className="border-secondary text-secondary rounded-full px-8 py-4 text-lg sm:text-xl font-normal font-sans"
        >
          RSVP
        </Button>
      </a>
    </div>
  );
}

export function Rsvp({ header, button }: RsvpProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Elegant reveal with scale and rotation
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotateX: 15,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Icon floating animation
      gsap.to(".rsvp-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Button pulse on scroll
      gsap.fromTo(
        ".rsvp-button",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".rsvp-button",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 scroll-mt-24"
    >
      <div className="container mx-auto text-center">
        <div
          ref={contentRef}
          className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10"
          style={{ perspective: "1000px" }}
        >
          <RsvpHeader title={header.title} description={header.description} />
          <RsvpButton url={button.url} />
        </div>
      </div>
    </section>
  );
}

export default Rsvp;
