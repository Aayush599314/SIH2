/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep / Forest Greens
        forest: {
          50: '#f0f7f1',
          100: '#dcebe0',
          200: '#bbd7c3',
          300: '#8fba9e',
          400: '#5e9774',
          500: '#3d7a56',
          600: '#2c6144',
          700: '#234e38',
          800: '#1d3f2e',
          900: '#163225',
          950: '#0c1d16',
        },
        // Dark Navy
        navy: {
          50: '#eef1f6',
          100: '#d4dbe6',
          200: '#a8b7cd',
          300: '#7d93b4',
          400: '#5a72a0',
          500: '#425c8a',
          600: '#354a72',
          700: '#2b3c5e',
          800: '#1f2b42',
          900: '#151e2f',
          950: '#0d131f',
        },
        // Saffron accents
        saffron: {
          50: '#fef7ea',
          100: '#fcecca',
          200: '#f9d893',
          300: '#f5bd56',
          400: '#f2a72f',
          500: '#e8891a',
          600: '#cd6a13',
          700: '#a84e13',
          800: '#883e17',
          900: '#6f3417',
        },
        // Neutral / off-white tones
        cream: {
          50: '#fbfaf7',
          100: '#f5f3ec',
          200: '#ebe7d9',
          300: '#dcd6c4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'flow': 'flow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        flow: { '0%, 100%': { strokeDashoffset: '0' }, '50%': { strokeDashoffset: '-20' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.06)',
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'lift': '0 10px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
