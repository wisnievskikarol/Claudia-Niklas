"use client";

import { FaqProps } from "@/app/types";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

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

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col items-center">
          <QuestionMarkCircleIcon className="w-20 h-20 text-secondary mb-6" />
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
