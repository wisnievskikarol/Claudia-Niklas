"use client";

import { Typography } from "@material-tailwind/react";

interface Props {
  title: string;
  description: string;
  time?: string;
  dresscode?: string;
  location?: string;
}

export function ScheduleItems({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 py-1 w-full">
      <div className="w-full max-w-xl px-2">
        <Typography
          variant="h5"
          className="text-white font-bold text-lg md:text-xl text-center"
        >
          {title}
        </Typography>
        <Typography className="text-white text-sm md:text-base text-center mt-1">
          {description}
        </Typography>
      </div>
    </div>
  );
}

export default ScheduleItems;
