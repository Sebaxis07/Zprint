/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ff666633',
          100: '#ff5555',
          200: '#ff4444',
          300: '#ff3333',
          400: '#ff2222',
          500: '#ff1111',
          600: '#ff0000',
          700: '#ee0000',
          800: '#dd0000',
          900: '#cc0000',
        },
        dark: {
          100: '#1a1a1a',
          200: '#141414',
          300: '#111111',
          400: '#0d0d0d',
          500: '#0a0a0a',
          600: '#080808',
          700: '#050505',
          800: '#030303',
          900: '#000000',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}