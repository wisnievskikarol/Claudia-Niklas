"use client";

import { Button } from "@material-tailwind/react";
import styles from "./hotel.module.css";
interface props {
  title: string;
  phone?: string;
  description?: string;
  reservationLink: string;
}

function Hotel({ title, phone, description, reservationLink }: props) {
  return (
    <div className={styles.container}>
      <div className="self-stretch text-center text-2xl font-['Lustria'] ">
        {title}
      </div>
      <div className="self-stretch text-base font-normal font-['Roboto'] my-1 leading-normal">
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
      <div
        className={`self-stretch text-lg font-normal font-['Roboto'] leading-normal ${styles.description}`}
      >
        {description}
      </div>
      <div className="px-7 py-2 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 inline-flex">
        <a href={reservationLink}>
          <Button
            variant="outlined"
            className="rounded-full border-secondary text-secondary"
          >
            Zarezerwuj
          </Button>
        </a>
      </div>
    </div>
  );
}

export default Hotel;
