/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gri: {
          green: "#518214",
          maroon: "#911C03",
          saffron: "#F16236",
          dark: "#1F2937",
        },
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
