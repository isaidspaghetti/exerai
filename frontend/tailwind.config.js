module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#12141D',
          600: '#0E1017'
        },
        secondary: {
          400: "#2B2E3B",
          500: "#1e2029",
          600: "#181A21",
        },
        tiffany: {
          500: '#2BB9B3',
          600: '#23958F',
        },
        eerie: {
          500: '#222222',
          600: '#1B1B1B',
        },
        splash: {
          500: '#554D98',
          600: '#443E7A'
        },
        text: {
          neutral: '#8F9094'
        }
      },
    },
},
  plugins: [],
}