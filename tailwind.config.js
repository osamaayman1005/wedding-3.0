/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF8F3',
        champagne: '#E2DAD2',
        sage: {
          50: '#F6F7F4',
          100: '#ECEFEA',
          200: '#D9DED6',
          300: '#C3CBC0',
          400: '#AEB7A8',
          500: '#949E8F',
          600: '#7F8878',
          700: '#707867',
          800: '#5F665A',
          900: '#4D5248',
        },
        ink: {
          50: '#F7F6F3',
          100: '#E9E7E1',
          200: '#D0CDC4',
          300: '#B5B1A6',
          400: '#8A8578',
          500: '#6F6A5E',
          600: '#575246',
          700: '#423E34',
          800: '#2B2A26',
          900: '#1B1A17',
        },
      },
      fontFamily: {
        en: ['Cormorant Garamond', 'ui-serif', 'Georgia', 'serif'],
        ar: ['Amiri', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft:
          '0 20px 60px -28px rgba(43,42,38,0.22), 0 10px 30px -20px rgba(43,42,38,0.16)',
        glow: '0 0 0 1px rgba(144,160,128,0.14), 0 0 80px rgba(144,160,128,0.08)',
      },
      backgroundImage: {
        paper:
          "radial-gradient(1200px 700px at 20% 10%, rgba(176,192,168,0.09), transparent 55%), radial-gradient(900px 600px at 80% 30%, rgba(216,208,200,0.18), transparent 55%), radial-gradient(800px 500px at 40% 95%, rgba(152,168,144,0.08), transparent 58%), linear-gradient(180deg, rgba(250,248,243,1), rgba(244,241,234,0.95))",
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        shimmer: {
          '0%': { opacity: '0.18' },
          '50%': { opacity: '0.36' },
          '100%': { opacity: '0.18' },
        },
      },
      animation: {
        floaty: 'floaty 9s ease-in-out infinite',
        fadeUp: 'fadeUp 900ms ease-out both',
        shimmer: 'shimmer 7s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
}
