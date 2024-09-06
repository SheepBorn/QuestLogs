/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1e1e1e',
        secondary: '#262424',
        tertiary: '#2E2E2E',
        textcolor: '#BEBEBE',
        buttoncolor: '#444444',
        bordercolor: '#BBBBBB'
      }
    },
  },
  plugins: [],
}