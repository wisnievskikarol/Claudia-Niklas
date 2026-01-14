"use client";

import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  time?: string;
  dresscode?: string;
  location?: string;
  type?: string;
}

export function ScheduleItems({
  title,
  description,
  type = "ceremony",
}: Props) {
  return (
    <motion.div
      className="w-full text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Time badge */}
      <div className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest mb-3 bg-white/15 text-white/90">
        {title}
      </div>

      {/* Description */}
      <Typography className="text-white text-lg md:text-2xl font-serif font-light">
        {description}
      </Typography>
    </motion.div>
  );
}

export default ScheduleItems;
