"use client";

import { HotelsProps } from "@/app/types";
import { useContext, useEffect, useRef } from "react";
import { LanguageContext } from "@/app/provider";
import { Typography } from "@material-tailwind/react";
import Hotel from "./hotel";
import styles from "./hotels.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hotels({ hotels, header }: HotelsProps) {
  const { lang } = useContext(LanguageContext);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  let title = header?.title || "Polecane hotele";
  let subtitle =
    header?.subtitle ||
    "Poniżej znajduje się lista polecanych przez nas hoteli";
  if (header?.translations && header.translations[lang]) {
    if (header.translations[lang].title)
      title = header.translations[lang].title!;
    if (header.translations[lang].subtitle)
      subtitle = header.translations[lang].subtitle!;
  }

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Hotel cards staggered entrance
      const hotelCards = gsap.utils.toArray(".hotel-card");
      hotelCards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          {
            opacity: 0,
            y: 60,
            rotateX: 15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power2.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card as HTMLElement,
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
      id="hotele"
      className="px-4 text-secondary md:px-8 scroll-mt-24"
    >
      <div className="container mx-auto text-center">
        <div className="flex flex-col justify-center items-center gap-8 md:gap-10">
          <div className="w-full flex flex-col items-center gap-4 mt-8">
            <div ref={headerRef} className="text-center">
              <Typography
                variant="h2"
                className="mb-4 font-normal font-Bellefair text-2xl sm:text-4xl"
              >
                {title}
              </Typography>
              <Typography
                variant="lead"
                className="mx-auto mb-4 md:mb-8 max-w-2xl text-base sm:text-lg"
              >
                {subtitle}
              </Typography>
            </div>
            <div className={styles.items}>
              {hotels.map((hotel) => (
                <div
                  key={hotel.title}
                  className="mb-14 md:mb-20 hotel-card"
                  style={{ perspective: "1000px" }}
                >
                  <Hotel
                    title={hotel.title}
                    phone={hotel.phone}
                    description={hotel.description}
                    reservationLink={hotel.reservationLink}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hotels;
