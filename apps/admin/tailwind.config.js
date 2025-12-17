/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0E9A91',
          gold: '#E8B54A',
          cosmos: '#1A2B4A',
        },
      },
    },
  },
  plugins: [],
};
