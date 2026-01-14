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
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
        }
        label="Data uroczystości"
        content={new Date(date).toLocaleDateString("pl-PL")}
      />
      <InfoItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        }
        label="Miejsce"
        content={address}
      />
      <InfoItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        }
        label="Godzina rozpoczęcia"
        content={time}
      />
    </div>
  );
}

export default HeroInfoBox;
