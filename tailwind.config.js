/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C5F2D',
          50: '#E8F5E8',
          100: '#D1EAD2',
          200: '#A3D5A6',
          300: '#75C079',
          400: '#4A9B4E',
          500: '#2C5F2D',
          600: '#234C24',
          700: '#1A391B',
          800: '#112612',
          900: '#081309'
        },
        secondary: {
          DEFAULT: '#97BC62',
          50: '#F4F8ED',
          100: '#E8F1DA',
          200: '#D1E3B5',
          300: '#BAD590',
          400: '#A3C76B',
          500: '#97BC62',
          600: '#7A9650',
          700: '#5C713C',
          800: '#3E4B28',
          900: '#1F2614'
        },
        accent: {
          DEFAULT: '#D4A574',
          50: '#FAF6F0',
          100: '#F5ECE1',
          200: '#EBD9C3',
          300: '#E1C6A5',
          400: '#D7B387',
          500: '#D4A574',
          600: '#C4915D',
          700: '#A57545',
          800: '#7C582E',
          900: '#3E2C17'
        },
        surface: '#FFFFFF',
        background: '#F8F9FA',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'hover': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'modal': '0 25px 50px rgba(0, 0, 0, 0.25)'
      },
      animation: {
        'heart-beat': 'heartBeat 0.6s ease-in-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        shimmer: {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0.5' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}