import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#1473c9", deep: "#0f6cbd" },
        ink: "#172433",
      },
    },
  },
  plugins: [],
};

export default config;
