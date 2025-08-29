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
        '3xl': '1728px',
        '4xl': '2160px',
      },
      colors: {
        'theme-blue': '#18BFDB',
        'theme-orange': '#F5710C',
        'theme-new-blue': '#0055FF',
        'inactive-blue': '#1B374E',
        'bg-gray': '#222222',
        'text-gray': '#9D9D9D',
        'pale-gray': '#bbbbbb',
        'light-gray': '#DDDDDD',
        'badge-yellow': '#FDB633',
      },
      spacing: {
        '5p': '5%',
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',
        '25p': '25%',
        '30p': '30%',
        dvh: 'calc(var(--dvh, 1vh) * 100)',
        svh: 'calc(var(--svh, 1vh) * 100)',
        vw: 'calc(var(--vw, 1vw) * 100)',
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
