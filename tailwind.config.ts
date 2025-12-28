import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/view/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        brandPrimary: "#003E3C",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        body: ["Inter"],
        Bellefair: ["Bellefair"],
      },
    },
  },
  plugins: [],
});

export default config;
