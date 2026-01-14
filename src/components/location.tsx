"use client";
import {
  LocationHeaderProps,
  LocationImageProps,
  LocationProps,
} from "@/app/types";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";

function LocationHeader({ title, description }: LocationHeaderProps) {
  return (
    <div className="flex flex-col text-secondary justify-start items-center gap-2 md:gap-4">
      <div className="text-center text-neutral-500 text-xs sm:text-sm md:text-base text-secondary font-['Roboto'] leading-normal">
        Miejsce
      </div>
      <div className="flex flex-col justify-start items-center gap-3 md:gap-6">
        <Typography
          variant="h2"
          className="mb-4 font-normal font-normal font-Bellefair text-2xl sm:text-3xl md:text-4xl"
        >
          {title}
        </Typography>
        <Typography variant="lead" className="text-sm sm:text-base md:text-lg">
          {description}
        </Typography>
      </div>
    </div>
  );
}

function LocationImage({ imageSrc, altText }: LocationImageProps) {
  return (
    <div className="w-full mt-8">
      <Image
        src={imageSrc}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        alt={altText}
      />
    </div>
  );
}

export function Location({ header, image }: LocationProps) {
  return (
    <section className="md:px-8 scroll-mt-24">
      <div className="container mx-auto text-center">
        <div className="px-4 md:px-16 flex flex-col justify-center items-center gap-4 md:gap-7">
          <LocationHeader
            title={header.title}
            description={header.description}
          />
          <LocationImage imageSrc={image.imageSrc} altText={image.altText} />
        </div>
      </div>
    </section>
  );
}

export default Location;
