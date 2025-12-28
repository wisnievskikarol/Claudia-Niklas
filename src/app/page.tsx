"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { componentConfig } from "./config/componentConfig";

export default function Campaign() {
  const components = componentConfig.map((config) => ({
    ...config,
    ref: useInView(),
    controls: useAnimation(),
  }));

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
