/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050B12',
        ink: '#E6EDF5',
        primary: '#6EE7F9',
        accent: '#A78BFA'
      },
      borderRadius: {
        '2xl': '1rem'
      },
      boxShadow: {
        glow: '0 0 40px rgba(111, 231, 249, 0.15)'
      }
    }
  },
  plugins: []
}
