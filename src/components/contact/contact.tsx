"use client";

import React from "react";
import ContactPerson from "./contact-person";
import { ContactProps } from "@/app/types";

export function Contact({ persons }: ContactProps) {
  return (
    <section className="px-4  md:px-8">
      <div className="container text-secondary mx-auto text-center">
        <div className="flex-col justify-center items-center gap-8 md:gap-20 inline-flex">
          <div className="w-full flex-col content-center justify-center items-center gap-4 inline-flex mt-8">
            <div className="flex flex-col self-stretch justify-center items-center gap-6 mb-8">
              <div className="self-stretch text-center text-2xl md:text-4xl font-normal font-['Lustria'] leading-9">
                Polecane hotele
              </div>
              <div className="self-stretch text-center text-lg font-normal font-['Roboto'] leading-relaxed">
                Poniżej znajduje się lista polecanych przez nas hoteli
              </div>
            </div>
            <div className="self-stretch justify-center items-center gap-12 inline-flex flex-col md:flex-row">
              {persons.map((person, id) => (
              <ContactPerson key={id} {...person} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
