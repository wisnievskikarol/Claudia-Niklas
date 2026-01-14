import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/view/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy support
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        brandPrimary: "#003E3C",

        // Editorial palette
        "editorial-cream": "var(--editorial-cream)",
        "editorial-ivory": "var(--editorial-ivory)",
        "editorial-linen": "var(--editorial-linen)",
        "editorial-champagne": "var(--editorial-champagne)",
        "editorial-sand": "var(--editorial-sand)",
        "editorial-charcoal": "var(--editorial-charcoal)",
        "editorial-graphite": "var(--editorial-graphite)",
        "editorial-slate": "var(--editorial-slate)",
        "editorial-stone": "var(--editorial-stone)",
        "editorial-muted": "var(--editorial-muted)",
        "editorial-gold": "var(--editorial-gold)",
        "editorial-rose": "var(--editorial-rose)",
        "editorial-border": "var(--editorial-border)",
        "editorial-border-hover": "var(--editorial-border-hover)",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        body: ["Inter"],
        editorial: ["Cormorant Garamond", "Georgia", "serif"],
        clean: ["Inter", ...defaultTheme.fontFamily.sans],
        Bellefair: ["Cormorant Garamond", "Georgia", "serif"],
      },
      fontSize: {
        "hero-display": "clamp(4rem, 12vw, 10rem)",
        "editorial-h1": "clamp(2.5rem, 6vw, 5rem)",
        "editorial-h2": "clamp(1.875rem, 4vw, 3rem)",
        "editorial-h3": "clamp(1.25rem, 2.5vw, 1.875rem)",
      },
      letterSpacing: {
        editorial: "0.2em",
      },
      lineHeight: {
        tight: "1.1",
        snug: "1.25",
      },
      animation: {
        "fade-in-up":
          "editorialFadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in": "editorialFadeIn 0.6s ease forwards",
        "scale-in":
          "editorialScaleIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.23, 1, 0.32, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
});

export default config;
