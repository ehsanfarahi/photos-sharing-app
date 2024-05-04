/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        position: "position",
      },
    },
    screens: {
      sm: { max: "600px" },
      // => @media (min-width: 640px) { ... }

      md: { max: "1280px", min: "600px" },
      // => @media (min-width: 768px) { ... }

      lg: { max: "1536px" },
      // => @media (min-width: 1024px) { ... }

      xl: { max: "1750px" },
      // => @media (min-width: 1280px) { ... }

      "2xl": { max: "1920px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
 