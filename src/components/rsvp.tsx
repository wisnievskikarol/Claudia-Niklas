"use client";

import { RsvpButtonProps, RsvpHeaderProps, RsvpProps } from "@/app/types";
import { Button, Typography } from "@material-tailwind/react";

function RsvpHeader({ title, description }: RsvpHeaderProps) {
  return (
    <div className="flex flex-col text-secondary justify-center items-center gap-4 md:gap-6">
      <svg
        className="w-20 h-20 text-secondary fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20 4C21.6569 4 23 5.34315 23 7V17C23 18.6569 21.6569 20 20 20H4C2.34315 20 1 18.6569 1 17V7C1 5.34315 2.34315 4 4 4H20ZM19.2529 6H4.74718L11.3804 11.2367C11.7437 11.5236 12.2563 11.5236 12.6197 11.2367L19.2529 6ZM3 7.1688V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7.16882L13.8589 12.8065C12.769 13.667 11.231 13.667 10.1411 12.8065L3 7.1688Z"
          ></path>
        </g>
      </svg>
      <div className="w-full flex flex-col justify-center items-center ">
        <Typography variant="h2" className="mb-4 font-normal font-Bellefair">
          {title}
        </Typography>
        <Typography variant="lead" className="text-center max-w-xl">
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
          className="border-secondary text-secondary rounded-full"
        >
          RSVP
        </Button>
      </a>
    </div>
  );
}

export function Rsvp({ header, button }: RsvpProps) {
  return (
    <section className="px-4 scroll-mt-24">
      <div className="container mx-auto text-center">
        <div className="flex flex-col justify-center items-center gap-7">
          <RsvpHeader title={header.title} description={header.description} />
          <RsvpButton url={button.url} />
        </div>
      </div>
    </section>
  );
}

export default Rsvp;
