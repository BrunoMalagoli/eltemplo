/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Cambia esto si tu estructura es diferente
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primaryRed: "#e04855",
        softRed: "#F71735",
        alertYellow: "#FDE74C",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
