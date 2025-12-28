"use client";
import { LocationsProps } from "@/app/types";
import { Typography } from "@material-tailwind/react";

export function Locations({
  sectionTitle,
  headerTitle,
  locations,
  mapSrc,
}: LocationsProps) {
  return (
    <section id="mapa" className="scroll-mt-24 text-secondary bg-primary py-10">
      <div className="mx-auto text-center max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex-col justify-start items-start flex">
            <div className="flex-col justify-start items-center gap-2 md:gap-4 flex">
              <div className="text-center text-sm md:text-base font-normal font-['Roboto'] text-secondary leading-normal">
                {sectionTitle}
              </div>
              <div className="self-stretch w-full flex-col justify-start items-center gap-3 md:gap-6 flex">
                <Typography variant="h2" className="mb-4 font-normal font-Bellefair">
                  {headerTitle}
                </Typography>
              </div>
            </div>
          </div>
          <section className="text-secondary body-font relative rounded-lg lg:flex lg:w-full lg:max-w-4xl bg-primary bg-opacity-75 shadow-lg">
            <div className="bg-secondary rounded-lg overflow-hidden lg:w-1/2">
              <iframe
                className="w-full h-64 md:h-96 lg:h-full"
                src={mapSrc}
                loading="lazy"
              ></iframe>
            </div>
            <div className="py-8 text-left px-4 flex flex-col bg-primary bg-opacity-75 text-secondary rounded-lg shadow-md lg:w-1/2 lg:ml-4">
              {locations.map((location, index) => (
                <div key={index}>
                  <h2 className="text-secondary text-lg mb-1 font-medium title-font">
                    {location.title}
                  </h2>
                  <p className="leading-relaxed mb-5 text-secondary">
                    {location.description}
                    <br />
                    <strong>Adres:</strong> {location.address}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Locations;
