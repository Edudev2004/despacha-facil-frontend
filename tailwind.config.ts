import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F5",
        ink: "#09090B",
        brand: {
          orange: "#FFA800",
          coral: "#F56917",
          teal: "#34C9A8",
        },
        acid: "#FFA800",
        teal: "#34C9A8",
        coral: "#F56917",
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "hard-sm": "2px 2px 0px 0px #09090B",
        "hard": "4px 4px 0px 0px #09090B",
        "hard-lg": "8px 8px 0px 0px #09090B",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
