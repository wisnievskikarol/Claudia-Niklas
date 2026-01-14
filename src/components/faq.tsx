"use client";

import { FaqProps } from "@/app/types";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Icon({ id, open }: { id: number; open: number }) {
  const isActive = id === open;
  return (
    <ChevronDownIcon
      className={`h-5 w-5 transition-transform ${isActive ? "rotate-180" : ""}`}
    />
  );
}

export function Faq({ faqs }: FaqProps) {
  const [open, setOpen] = useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal with elegant scale
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
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
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Accordion items staggered entrance
      const accordions = gsap.utils.toArray(".faq-accordion-item");
      accordions.forEach((item, index) => {
        gsap.fromTo(
          item as HTMLElement,
          {
            opacity: 0,
            x: index % 2 === 0 ? -40 : 40,
            rotateY: index % 2 === 0 ? -10 : 10,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8"
    >
      <div className="container mx-auto">
        <div
          ref={headerRef}
          className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-20 h-20 text-secondary mb-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          <div className="text-center">
            <Typography
              variant="h2"
              className="mb-4 font-normal font-Bellefair text-2xl sm:text-3xl md:text-4xl"
            >
              Często zadawane pytania
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto hover:text-secondary w-full max-w-2xl text-sm sm:text-base md:text-lg"
            >
              Ponieżej znajdziecie odpowiedzi na najczęściej zadawane przez Was
              pytania!
            </Typography>
          </div>
        </div>
        <div className="mx-auto lg:max-w-screen-lg lg:px-15">
          {faqs.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              icon={<Icon id={key + 1} open={open} />}
              onClick={() => handleOpen(key + 1)}
              className="faq-accordion-item"
            >
              <AccordionHeader className="text-left hover:text-gray-600 hover:text-underline font-normal text-secondary text-sm sm:text-base md:text-lg">
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography className="font-normal text-secondary text-xs sm:text-sm md:text-base">
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
