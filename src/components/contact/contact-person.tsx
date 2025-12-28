"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
type props = {
  name: string;
  phone?: string;
  email: string;
  facebook?: string;
  x?: string;
  whatsapp?: string;
  signal?: string;
};

function ContactPerson({
  name,
  phone,
  email,
  facebook,
  x,
  whatsapp,
  signal,
}: props) {
  return (
    <div className="grow shrink basis-0 flex-col justify-center items-center gap-4 inline-flex">
      <div className="self-stretch text-center text-black text-xl md:text-2xl font-normal font-['Lustria'] ">
        {name}
      </div>

      {phone && (
        <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
          {phone}
        </div>
      )}
      {email && (
        <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
          {email}
        </div>
      )}
      {facebook && (
        <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
          {facebook}
        </div>
      )}
      {x && (
        <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
          {x}
        </div>
      )}
      {whatsapp && (
        <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
          {whatsapp}
        </div>
      )}
      {signal && (
        <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
          {signal}
        </div>
      )}
      <div className="px-7 py-2 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 inline-flex">
        <Button variant="outlined" className="rounded-full">
          Zarezerwuj
        </Button>
      </div>
    </div>
  );
}

export default ContactPerson;
