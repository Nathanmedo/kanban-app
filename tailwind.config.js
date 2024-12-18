/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'san-serif']
      },
      backgroundImage : {
        'ImageOne': "url('/src/assets/react.svg')"
      }
    },
  },
  plugins: [],
}

