// tailwind.config.js
module.exports = {
  purge: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  variants:{
  }
};
