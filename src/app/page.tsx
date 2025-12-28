"use client";

import React, { useEffect, useContext } from "react";
import { LanguageContext } from "./provider";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { componentConfig } from "./config/componentConfig";

export default function Campaign() {
  const { lang } = useContext(LanguageContext);
  const components = componentConfig.map((config) => {
    // Deep clone props and replace with translation if available
    const props = JSON.parse(JSON.stringify(config.props));
    // Hero
    if (
      props.content &&
      props.content.translations &&
      props.content.translations[lang]
    ) {
      Object.assign(props.content, props.content.translations[lang]);
    }
    // RSVP
    if (
      props.header &&
      props.header.translations &&
      props.header.translations[lang]
    ) {
      Object.assign(props.header, props.header.translations[lang]);
    }
    // FAQ
    if (props.faqs) {
      props.faqs = props.faqs.map((faq: any) => {
        if (faq.translations && faq.translations[lang]) {
          return { ...faq, ...faq.translations[lang] };
        }
        return faq;
      });
    }
    // Hotels
    if (props.hotels) {
      props.hotels = props.hotels.map((hotel: any) => {
        if (hotel.translations && hotel.translations[lang]) {
          return { ...hotel, ...hotel.translations[lang] };
        }
        return hotel;
      });
    }
    return {
      ...config,
      props,
      ref: useInView(),
      controls: useAnimation(),
    };
  });

  useEffect(() => {
    components.forEach(({ ref, controls }) => {
      if (ref.inView) controls.start("visible");
    });
  }, [components]);

  return (
    <div className="flex flex-col gap-20 sm:gap-32">
      {components.map(
        ({ component: Component, ref, controls, props }, index) => (
          <motion.div
            className="z-20"
            key={index}
            ref={ref.ref}
            animate={controls}
            initial="hidden"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 30 },
            }}
            transition={{ duration: 1 }}
          >
            <Component {...props} />
          </motion.div>
        )
      )}
    </div>
  );
}
