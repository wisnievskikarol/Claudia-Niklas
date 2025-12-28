"use client";

import { FaqProps } from "@/app/types";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

function Icon({ id, open }: { id: number; open: number }) {
  const isActive = id === open;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${isActive ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function Faq({ faqs }: FaqProps) {
  const [open, setOpen] = useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <section
      id="q&a"
      className="px-4 text-secondary mb-16 md:mb-32 scroll-mt-24"
    >
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center gap-4 md:gap-7 mb-10">
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
                d="M9.11241 7.82201C9.44756 6.83666 10.5551 6 12 6C13.7865 6 15 7.24054 15 8.5C15 9.75946 13.7865 11 12 11C11.4477 11 11 11.4477 11 12L11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14L13 12.9082C15.203 12.5001 17 10.7706 17 8.5C17 5.89347 14.6319 4 12 4C9.82097 4 7.86728 5.27185 7.21894 7.17799C7.0411 7.70085 7.3208 8.26889 7.84366 8.44673C8.36653 8.62458 8.93457 8.34488 9.11241 7.82201ZM12 20C12.8285 20 13.5 19.3284 13.5 18.5C13.5 17.6716 12.8285 17 12 17C11.1716 17 10.5 17.6716 10.5 18.5C10.5 19.3284 11.1716 20 12 20Z"
              ></path>
            </g>
          </svg>
          <div className="text-center">
            <Typography
              variant="h2"
              className="mb-4 font-normal font-Bellefair text-2xl sm:text-4xl"
            >
              Często zadawane pytania
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto hover:text-secondary w-full max-w-2xl text-base sm:text-lg"
            >
              Ponieżej znajdziecie odpowiedzi na najczęsciej zadawne przez Was
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
            >
              <AccordionHeader className="text-left hover:text-gray-600 hover:text-underline font-normal text-secondary text-base sm:text-lg">
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography className="font-normal text-secondary text-sm sm:text-base">
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
