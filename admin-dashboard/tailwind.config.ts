import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        success: '#16a34a',
        warning: '#f59e0b',
        danger: '#ef4444',
        muted: '#64748b',
        background: 'rgb(248 250 252)',
        foreground: 'rgb(2 6 23)',
        card: 'rgb(255 255 255)',
        border: 'rgb(226 232 240)'
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 1px 3px 0 rgba(16, 24, 40, 0.10)'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
