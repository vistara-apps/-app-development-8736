/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 70% 50%)',
        accent: 'hsl(150 65% 45%)',
        bg: {
          DEFAULT: 'hsl(0 0% 97%)',
          dark: 'hsl(240 10% 10%)'
        },
        surface: {
          DEFAULT: 'hsl(0 0% 100%)',
          dark: 'hsl(240 10% 15%)'
        },
        'text-primary': {
          DEFAULT: 'hsl(240 5% 15%)',
          dark: 'hsl(0 0% 95%)'
        },
        'text-secondary': {
          DEFAULT: 'hsl(240 5% 35%)',
          dark: 'hsl(240 5% 65%)'
        },
        border: {
          DEFAULT: 'hsl(240 5% 88%)',
          dark: 'hsl(240 10% 25%)'
        },
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
        'dark-card': '0 5px 20px hsla(0, 0%, 0%, 0.2)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}
