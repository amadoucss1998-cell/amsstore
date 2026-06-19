/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#0D0D1A',
        card: '#1C1C2E',
        surface: '#16213E',
        primary: '#FF6B35',
        gold: '#FFD700',
        muted: '#606080',
        dim: '#A0A0C0',
        border: '#2A2A4A',
      },
    },
  },
  plugins: [],
};
