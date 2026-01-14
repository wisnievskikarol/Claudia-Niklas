"use client";

import { RsvpButtonProps, RsvpHeaderProps, RsvpProps } from "@/app/types";
import { Button, Typography } from "@material-tailwind/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

function RsvpHeader({ title, description }: RsvpHeaderProps) {
  return (
    <div className="flex flex-col text-secondary justify-center items-center gap-4 md:gap-6">
      <EnvelopeIcon className="w-20 h-20 text-secondary" />
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
    <div className="px-4 md:px-7 pt-8 sm:pt-4 rounded-lg flex justify-center items-center gap-2.5">
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
  return (
    <section
      id="rsvp"
      className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 scroll-mt-24"
    >
      <div className="container mx-auto text-center">
        <div className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10">
          <RsvpHeader title={header.title} description={header.description} />
          <RsvpButton url={button.url} />
        </div>
      </div>
    </section>
  );
}

export default Rsvp;
