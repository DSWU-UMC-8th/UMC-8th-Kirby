const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["animate-shimmer"],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 1.2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundColor: "#3f3f46" },
          "50%": { backgroundColor: "#52525b" },
          "100%": { backgroundColor: "#3f3f46" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
