/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    outlineColor: 'red',
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};