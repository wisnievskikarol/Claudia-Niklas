"use client";

import { ScheduleProps } from "@/app/types";
import { Typography } from "@material-tailwind/react";
import ScheduleItem from "./schedule-item";
import Image from "next/image";

interface CustomStyleProps {
  sectionClass?: string;
  overlayClass?: string;
  contentClass?: string;
  backgroundImage?: string;
}

type Props = ScheduleProps & { customStyle?: CustomStyleProps };

export function Schedule({ items, customStyle }: Props) {
  return (
    <section
      id="harmonogram"
      className={customStyle?.sectionClass || "relative w-full py-0 px-0"}
      style={{ position: "relative", width: "100%", overflow: "hidden" }}
    >
      {/* Background image */}
      {customStyle?.backgroundImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundImage: `url(${customStyle.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: 0.15,
          }}
          aria-hidden="true"
        />
      )}
      {/* Black translucent overlay */}
      <div
        className={
          customStyle?.overlayClass ||
          "absolute inset-0 w-full h-full bg-black bg-opacity-70 z-10"
        }
      />
      {/* Content */}
      <div
        className={
          customStyle?.contentClass ||
          "relative z-20 flex flex-col items-center justify-center min-h-[700px] py-20"
        }
      >
        <Typography
          variant="h2"
          className="mb-10 font-normal font-Bellefair text-4xl md:text-5xl text-white"
        >
          Plan uroczystości
        </Typography>
        <div className="flex flex-col items-center gap-3 w-full px-2 md:px-0">
          <div className="flex flex-col gap-3 w-full">
            {items.map((item, index) => (
              <div
                key={index}
                className={`w-full max-w-xl mx-auto py-2 md:py-2 border-b border-white/20 last:border-b-0 transition-colors duration-300 text-white/80`}
                style={{ textAlign: "center" }}
              >
                <div className="flex flex-col items-center justify-center w-full text-center">
                  <ScheduleItem
                    title={item.title}
                    description={item.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
