/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        green: {
          DEFAULT: '#3a6647',
          dark: '#2a5035',
          light: '#e8f0eb',
          pale: '#f0f5f1',
        },
        beige: {
          DEFAULT: '#faf6ef',
          deep: '#f0e8d8',
          card: '#fdf9f4',
        },
        amber: {
          brand: '#c8975f',
          light: '#fef3e6',
        },
        brand: {
          charcoal: '#1a1a1e',
          border: '#e5ddd0',
          white: '#fffef9',
        }
      },
    },
  },
  plugins: [],
}
