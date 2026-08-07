/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        khadi: {
          blue: "#0D47A1",
          light: "#82B1FF",
          dark: "#002171",
        },
        saffron: {
          DEFAULT: "#E65100",
          light: "#FF9800",
        },
        sage: {
          DEFAULT: "#2E7D32",
          light: "#4CAF50",
        },
      },
    },
  },
  plugins: [],
};
