/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)'
      },
      borderRadius: {
        '2xl': '1rem'
      },
      boxShadow: {
        glow: 'var(--shadow-glow)'
      }
    }
  },
  plugins: []
}
