module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'sxl': ''
        '3xl': '1920px',
      },
    },
  },
  variants: {
    extend: {
      transform: ['group-hover'],
      rotate: ['group-hover'],
    },
  },
  plugins: [],
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/*': ['./*'],
    },
  },
}
