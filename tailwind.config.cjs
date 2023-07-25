/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './*.html'],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',      
        '3': '3px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'blue': '#1177d1',
        'indigo': '#6610f2',
        'purple': '#613d7c',
        'pink': '#e83e8c',
        'red': {
          550: '#d43f3a', //question mark bg and incorrect mark
          },
        'orange': '#f0ad4e',
        'yellow': '#ff7518',
        'green': {
          650: '#398439', //question mark bg and correct mark
          },
        'teal': '#20c997',
        'cyan': '#008196',
        'white': '#fff',
        // 'gray': '#6c757d',
        'gray': {
          350: '#dee2e6', //question number block bg
        },
        'gray-dark': '#343a40',
        'welcome': '#cce6ea', //question and answer variants block bg
        'primary': '#1177d1', //next question btn bg
        'primhover': '#0e63ae', //next question btn hover bg
        'secondary': '#ced4da', //previous question btn bg
        'sechover': '#b8c1ca', //previous question btn hover bg
        'prev': '#212529', //previous question btn text color
        'success': '#398439',
        'info': '#008196',
        'ask': '#00434e',
        'warning': '#f0ad4e',
        'danger': '#d43f3a',
        'light': '#f8f9fa',
        'dark': '#343a40',
      },
    },    
  },
  plugins: [],
};
