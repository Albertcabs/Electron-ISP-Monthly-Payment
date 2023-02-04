/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './packages/renderer/index.html',
      './packages/renderer/src/**/**/*.{ts,tsx}',
   ],
   theme: {
      extend: {},
   },
   plugins: [require('@tailwindcss/container-queries')],
};
