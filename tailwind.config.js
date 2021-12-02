module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend:{
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        green: {
          light: '#00eb56',
          DEFAULT: '#009637',
          dark: '#005a21'
        },
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
