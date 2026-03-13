/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        indie: {
          bg: 'var(--color-indie-bg)',
          surface: 'var(--color-indie-surface)',
          primary: 'var(--color-indie-primary)',
          secondary: 'var(--color-indie-secondary)',
          accent: 'var(--color-indie-accent)',
          text: 'var(--color-indie-text)',
          muted: 'var(--color-indie-muted)',
        }
      },
      boxShadow: {
        'ethereal': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'ethereal-hover': '0 20px 40px -10px rgba(0,0,0,0.18)',
        'glass': 'inset 0 0 0 1px var(--color-indie-glass-border), 0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 8px -2px rgba(0,0,0,0.05)'
      }
    },
  },
  plugins: [],
}
