"use client";

import { HotelsProps } from "@/app/types";
import { useContext } from "react";
import { LanguageContext } from "@/app/provider";
import { Typography } from "@material-tailwind/react";
import Hotel from "./hotel";
import styles from "./hotels.module.css";

export function Hotels({ hotels, header }: HotelsProps) {
  const { lang } = useContext(LanguageContext);
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
  return (
    <section id="hotele" className="px-4 text-secondary md:px-8 scroll-mt-24">
      <div className="container mx-auto text-center">
        <div className="flex flex-col justify-center items-center gap-8 md:gap-10">
          <div className="w-full flex flex-col items-center gap-4 mt-8">
            <div className="text-center">
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
                <div key={hotel.title} className="mb-14 md:mb-20">
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
