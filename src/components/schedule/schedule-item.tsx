"use client";

import { Typography } from "@material-tailwind/react";

interface Props {
  title: string;
  description: string;
  time?: string;
  dresscode?: string;
  location?: string;
}

export function ScheduleItems({
  title,
  time,
  dresscode,
  location,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-4 ">
      <div className="text-center text-stone-800 text-2xl md:text-3xl font-normal font-['Lustria'] leading-8 md:leading-10">
        {title}
      </div>

      <Typography variant="paragraph" className="text-center">
        {description}
      </Typography>
    </div>
  );
}

export default ScheduleItems;
