/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        "nico-moji": ["var(--font-nico-moji)", "sans-serif"],
      },
      colors: {
        primary: "#545452", // #545452 RGB(84, 84, 82)
        secondary: "#BBBBBA", // #BBBBBA RGB(187, 187, 186)
        tertiary: "#DDDDDC", // #DDDDDC RGB(221, 221, 220)
        accent: "#767675", // #767675 RGB(118, 118, 117)
        muted: "#989897", // #989897 RGB(152, 152, 151)
        dark: "#333333", // чорний або темний колір для тексту
        light: "#f5f5f5", // світлий колір для фону
      },
      animation: {
        spin: "pulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.2)", opacity: "0.7" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
