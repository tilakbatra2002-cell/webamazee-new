/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0F6DFF',
          50: '#EEF5FF',
          100: '#DCEAFF',
          200: '#BBD6FF',
          300: '#8FBAFF',
          400: '#5595FF',
          500: '#0F6DFF',
          600: '#0A57D1',
          700: '#0844A4',
          800: '#073779',
          900: '#062B5C',
        },
        ink: {
          DEFAULT: '#0B0D12',
          muted: '#5A6373',
          soft: '#8B93A3',
        },
        line: '#E4E8EF',
        surface: '#F6F8FB',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,13,18,0.04), 0 8px 24px -12px rgba(11,13,18,0.10)',
        pop: '0 12px 40px -12px rgba(11,13,18,0.22)',
      },
      borderRadius: { xl: '12px', '2xl': '16px' },
    },
  },
  plugins: [],
};
