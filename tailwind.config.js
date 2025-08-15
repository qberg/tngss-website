module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        '13xl': '13rem',
      },
    },
  },
  variants: {
    extend: {
      transform: ['group-hover'],
      rotate: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/*': ['./*'],
    },
  },
}
