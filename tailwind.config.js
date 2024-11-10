/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    fontFamily: {
      'sans': ['OpenSans', 'Montserrat']
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/hero.png')",
      },
    },
  },
  plugins: [],
};
