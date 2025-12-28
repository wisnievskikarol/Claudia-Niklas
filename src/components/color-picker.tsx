"use client";

import getContrast from "@/util/getContrast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

const ColorPicker = () => {
  const [primary, setPrimary] = useState("#114232");
  const [secondary, setSecondary] = useState("#FFF5E0");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [contrast, setContrast] = useState(100);

  useEffect(
    () => setContrast(getContrast(primary, secondary)),
    [primary, secondary]
  );

  const handlePrimaryChange = (color: ColorResult) => {
    setPrimary(color.hex);
    document.documentElement.style.setProperty("--color-primary", color.hex);
  };

  const handleSecondaryChange = (color: ColorResult) => {
    setSecondary(color.hex);
    document.documentElement.style.setProperty("--color-secondary", color.hex);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ x: "100%", opacity: 0.5 }}
        animate={{
          x: isVisible ? "0%" : "100%",
          opacity: isVisible || isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white p-6 rounded-xl shadow-xl border border-gray-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={toggleVisibility}
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white w-10 h-10 rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-blue-600 transition-colors duration-300"
        >
          {isVisible ? ">" : "<"}
        </button>
        {contrast > 1 / 4.5 && (
          <div className="absolute -top-20 bg-amber-500 px-4 py-2 rounded-lg">
            <p>
              Kontrast pomiędzy kolorami może być niewystarczający dla
              czytelności niektórych elementów.
            </p>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="flex-1 text-center">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Kolor Główny
            </p>
            <SketchPicker
              color={primary}
              onChangeComplete={handlePrimaryChange}
              disableAlpha
              presetColors={["#FF5733", "#33FF57", "#3357FF", "#FFFF33"]}
            />
          </div>
          <div className="flex-1 text-center">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Kolor Czcionki
            </p>
            <SketchPicker
              color={secondary}
              onChangeComplete={handleSecondaryChange}
              disableAlpha
              presetColors={["#FF5733", "#33FF57", "#3357FF", "#FFFF33"]}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ColorPicker;
