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
          50: '#eef6ff',
          100: '#dbeeff',
          300: '#7fb3ff',
          500: '#2563eb', // primary blue
        }
      }
    }
  },
  plugins: [],
}
