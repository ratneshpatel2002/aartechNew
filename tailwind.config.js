/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0C013D',
          dark: '#070024',
          surface: '#1E1260',
          light: '#150654'
        },
        'box-red': '#DE0001',
        'foot-blue': '#0C013D',
        'lightBlack': '#1E293B',
        brand: {
          blue: '#0C013D',
          red: '#DE0001',
          'red-dark': '#B80001',
          gray: '#F0F0F0'
        }
      },
      fontFamily: {
        Barlow: ['Barlow', 'sans-serif'],
        sans: ['Barlow', 'sans-serif'],
        antonio: ['Antonio', 'Barlow Condensed', 'sans-serif'],
        manrope: ['"Manrope"', 'sans-serif'],
        'manrope-light': ['"Manrope-Light"', '"Manrope"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
