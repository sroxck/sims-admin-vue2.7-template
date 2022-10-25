// tailwind.config.js
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
       },
       lineHeight: {
        'extra-loose': '3.5',
       },
        colors: {
      primary:"#f5f6fb"
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
