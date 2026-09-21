/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          500: '#1a7659',
          600: '#0d7a6b',
          700: '#155e4a',
        },
        accent: {
          400: '#0ea5e9',
          500: '#0369a1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s infinite',
        'typewriter': 'typing 3.5s steps(40) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a7659 0%, #0d7a6b 50%, #0ea5e9 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(26, 118, 89, 0.3)',
        'glow-blue': '0 0 30px rgba(14, 165, 233, 0.3)',
      }
    },
  },
  plugins: [],
}
