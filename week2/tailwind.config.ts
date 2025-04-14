import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✨ 필수!
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
