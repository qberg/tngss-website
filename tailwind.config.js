module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'theme-blue': '#18BFDB',
        'theme-orange': '#F5710C',
        'inactive-blue': '#1B374E',
        'bg-gray': '#222222',
        'text-gray': '#9D9D9D',
      },
      fontSize: {
        '13xl': '13rem',
      },
      height: {
        dvh: 'calc(var(--dvh, 1vh) * 100)',
        svh: 'calc(var(--svh, 1vh) * 100)',
        lvh: 'calc(var(--lvh, 1vh) * 100)',
      },
      width: {
        vw: 'calc(var(--vw, 1vw) * 100)',
      },
      spacing: {
        dvh: 'calc(var(--dvh, 1vh) * 100)',
        svh: 'calc(var(--svh, 1vh) * 100)',
        vw: 'calc(var(--vw, 1vw) * 100)',
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
