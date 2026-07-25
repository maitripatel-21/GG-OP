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
          bg: '#0B0F19',
          surface: '#111827',
          card: '#1F2937',
          border: 'rgba(255, 255, 255, 0.1)',
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          purple: '#8B5CF6',
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glow: '0 0 20px rgba(6, 182, 212, 0.25)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
      animation: {
        pulseGauge: 'pulseGauge 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGauge: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
