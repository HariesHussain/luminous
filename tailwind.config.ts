import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        cream: "var(--color-cream)",
        gold: {
          DEFAULT: "var(--color-gold)",
          light: "var(--color-gold-light)",
        },
        burgundy: "var(--color-burgundy)",
        charcoal: "var(--color-charcoal)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        body: ["var(--font-jost)", "Jost", "sans-serif"],
      },
      spacing: {
        section: "var(--spacing-section)",
      },
    },
  },
  plugins: [],
};

export default config;
