/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        nunito: ["Nunito", "sans-serif"],
        comfortaa: ["Comfortaa", "cursive"],
        caveat: ["Caveat", "cursive"],
      },
      colors: {
        primary: "#3d405b",
        secondary: "#e07a5f",
        tertiary: "#f4f1de",
        // primary: "#edf6f9",
        // secondary: "#83c5be",
        // tertiary: "#006d77",
      },
    },
  },
  plugins: [],
});
