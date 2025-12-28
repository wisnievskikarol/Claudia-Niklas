"use client";

import { HotelsProps } from "@/app/types";
import { Typography } from "@material-tailwind/react";
import Hotel from "./hotel";
import styles from "./hotels.module.css";

export function Hotels({ hotels }: HotelsProps) {
  return (
    <section id="hotele" className="px-4 text-secondary md:px-8 scroll-mt-24">
      <div className="container mx-auto text-center">
        <div className="flex flex-col justify-center items-center gap-8 md:gap-10">
          <div className="w-full flex flex-col items-center gap-4 mt-8">
            <div className="text-center">
              <Typography
                variant="h2"
                className="mb-4 font-normal font-Bellefair"
              >
                Polecane hotele
              </Typography>
              <Typography
                variant="lead"
                className="mx-auto mb-10 md:mb-24 max-w-2xl"
              >
                Poniżej znajduje się lista polecanych przez nas hoteli
              </Typography>
            </div>
            <div className={styles.items}>
              {hotels.map((hotel) => (
                <div key={hotel.title} className="mb-8">
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
