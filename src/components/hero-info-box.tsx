import React from "react";
import { Typography } from "@material-tailwind/react";

interface Props {
  date: Date;
  address: string;
  time: string;
}

interface InfoItemProps {
  icon: JSX.Element;
  label: string;
  content: string;
}

function InfoItem({ icon, label, content }: InfoItemProps) {
  // Wyrównanie do lewej tylko dla "Miejsce"
  const isAddress = label === "Miejsce";
  return (
    <div className="info-item flex items-center gap-4 p-2 rounded-lg transition duration-300 ease-in-out bg-opacity-75">
      <div className="icon-container flex-shrink-0 w-10 h-10 p-1.5 rounded-full text-secondary">
        {icon}
      </div>
      <Typography
        className={
          "text-secondary" + (isAddress ? " text-left sm:text-center" : "")
        }
      >
        <span className="font-bold">{label}: </span>
        {content}
      </Typography>
    </div>
  );
}

function HeroInfoBox({ date, address, time }: Props) {
  return (
    <div className="hero-info-box w-full text-secondary px-6 sm:px-10 py-5 rounded-lg flex flex-col sm:flex-row justify-between gap-6 sm:gap-12 bg-primary bg-opacity-30">
      <InfoItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
          </svg>
        }
        label="Data uroczystości"
        content={new Date(date).toLocaleDateString("pl-PL")}
      />
      <InfoItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 17.2S7 11.48 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.48-5 10.2-5 10.2zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
          </svg>
        }
        label="Miejsce"
        content={address}
      />
      <InfoItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 8v5l4.28 2.54.72-1.21-3.5-2.08V8z" />
            <path d="M20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8 8 3.58 8 8zm-8-10C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        }
        label="Godzina rozpoczęcia"
        content={time}
      />
    </div>
  );
}

export default HeroInfoBox;
