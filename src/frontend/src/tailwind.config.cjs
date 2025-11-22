/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#8C1AF6",
          600: "#6d13c3",
        },
      },
    },
  },
  plugins: [],
};
