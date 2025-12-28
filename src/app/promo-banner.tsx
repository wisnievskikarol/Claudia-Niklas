"use client";

import React from "react";

export default function PromoBanner() {
  return (
    <section className="flex justify-center bg-brandPrimary px-4 py-16 text-white">
      <div className="container flex flex-col md:flex-row items-center">
        <img
          className="w-12 mb-4 md:mb-0"
          src="./image/info.svg"
          alt="Information Icon"
        />

        <div className="hidden md:block mx-4 w-px bg-white h-8" />

        <div className="text-center md:text-left">
          <h3 className="font-Bellefair text-2xl md:text-3xl mb-2">
            Chciałbyś taką stronę? Stwórzmy ją razem!
          </h3>
          <p className="text-lg">
            <a
              target="_blank"
              href="https://gowedding.online/contact"
              className="underline hover:text-gray-200 transition-colors duration-300"
            >
              Napisz do nas
            </a>{" "}
            już teraz!
          </p>
        </div>
      </div>
    </section>
  );
}
