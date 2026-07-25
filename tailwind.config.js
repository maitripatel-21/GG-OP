/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './popup.html',
    './options.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        guard: {
          bg: '#0C0E14',
          surface: '#161922',
          card: '#1F2432',
          crimson: '#E2454A',
          charcoal: '#303030',
          silver: '#DADADA',
          offwhite: '#F5F5F5',
          cyan: '#E2454A', // Primary accent updated to approved Crimson #E2454A
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#E2454A',
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        glow: '0 0 20px rgba(226, 69, 74, 0.3)',
        'glow-crimson': '0 0 20px rgba(226, 69, 74, 0.35)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
    },
  },
  plugins: [],
};
