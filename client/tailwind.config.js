/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#142B4A',
          'navy-dark': '#0C1B2E',
          'navy-light': '#1E3C66',
          blue: '#356AE6',
          'blue-hover': '#2855C4',
          'blue-light': '#EBF1FD',
          'blue-50': '#F3F7FE',
        },
        bg: {
          main: '#F6F8FC',
          card: '#FFFFFF',
          alt: '#F0F3FA',
        },
        text: {
          primary: '#182230',
          secondary: '#667085',
          muted: '#98A2B3',
        },
        border: {
          DEFAULT: '#E5EAF2',
          light: '#F0F3F8',
          dark: '#D0D7E2',
        },
        status: {
          success: '#16845B',
          'success-bg': '#E8F5EF',
          warning: '#B7791F',
          'warning-bg': '#FEF7EC',
          error: '#D92D20',
          'error-bg': '#FEECEB',
          info: '#175CD3',
          'info-bg': '#EFF4FF',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(16, 24, 40, 0.05)',
        'soft': '0 4px 16px -2px rgba(16, 24, 40, 0.06), 0 2px 6px -2px rgba(16, 24, 40, 0.04)',
        'soft-lg': '0 12px 32px -4px rgba(16, 24, 40, 0.08), 0 4px 12px -2px rgba(16, 24, 40, 0.03)',
        'card-hover': '0 16px 36px -4px rgba(20, 43, 74, 0.12), 0 6px 16px -2px rgba(20, 43, 74, 0.06)',
      },
    },
  },
  plugins: [],
}
