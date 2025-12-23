/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        english: ["'Fira Code'", "monospace"],
        bangla: ["'Noto Serif Bengali'", "serif"],
      },
    },
  },
  plugins: [],
};
