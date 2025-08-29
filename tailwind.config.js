/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 70% 50%)',
        accent: 'hsl(150 65% 45%)',
        bg: 'hsl(0 0% 97%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(240 5% 15%)',
        'text-secondary': 'hsl(240 5% 35%)',
        border: 'hsl(240 5% 88%)',
        error: 'hsl(0 80% 50%)',
        success: 'hsl(140 60% 40%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 hsla(0, 0%, 0%, 0.05)',
        'md': '0 4px 6px -1px hsla(0, 0%, 0%, 0.1), 0 2px 4px -2px hsla(0, 0%, 0%, 0.1)',
        'lg': '0 10px 15px -3px hsla(0, 0%, 0%, 0.1), 0 4px 6px -4px hsla(0, 0%, 0%, 0.1)',
        'card': '0 5px 20px hsla(0, 0%, 0%, 0.08)',
      },
      animation: {
        'fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        'base': '300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slow': '600ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}