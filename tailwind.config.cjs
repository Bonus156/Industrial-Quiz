/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './*.html'],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',      
        '3': '3px',
      },
    },
  },
  plugins: [],
};
