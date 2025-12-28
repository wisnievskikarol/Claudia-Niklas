"use client";

import { ScheduleProps } from "@/app/types";
import { Typography } from "@material-tailwind/react";
import ScheduleItem from "./schedule-item";

export function Schedule({ items }: ScheduleProps) {
  return (
    <section
      id="harmonogram"
      className="bg-primary py-16 px-4 text-secondary scroll-mt-24 md:px-8"
    >
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center gap-12 px-4 md:px-16">
          <div className="flex flex-col items-center gap-4">
            <Typography
              variant="h2"
              className="mb-4 font-normal font-Bellefair"
            >
              Plan uroczystości
            </Typography>
          </div>
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col gap-8 text-center md:gap-12">
              {items.map((item, index) => (
                <ScheduleItem
                  key={index}
                  type={item.type}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
