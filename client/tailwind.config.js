/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- YOU MUST ADD THIS LINE
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
