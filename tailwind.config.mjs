// tailwind.config.mjs

const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: 'rgb(var(--color-border))',
        input: 'rgb(var(--color-input))',
        ring: 'rgb(var(--color-ring))',
        background: 'rgb(var(--color-background))',
        foreground: 'rgb(var(--color-foreground))',
        primary: {
          DEFAULT: 'rgb(var(--color-primary))',
          foreground: 'rgb(var(--color-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary))',
          foreground: 'rgb(var(--color-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'rgb(var(--color-destructive))',
          foreground: 'rgb(var(--color-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-muted))',
          foreground: 'rgb(var(--color-muted-foreground))',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent))',
          foreground: 'rgb(var(--color-accent-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Clash Display', 'Space Grotesk', ...fontFamily.sans],
      },
      fontSize: {
        'h1': ['6rem', { lineHeight: '1.1', fontWeight: '600' }], // 96px
        'h2': ['4rem', { lineHeight: '1.2', fontWeight: '500' }], // 64px
        'h3': ['2.5rem', { lineHeight: '1.3', fontWeight: '500' }], // 40px
        'p': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'button': ['1.125rem', { lineHeight: '1', fontWeight: '600' }], // 18px
      },
      // ... any other extensions like keyframes or borderRadius can go here
    },
  },
  plugins: [require("tailwindcss-animate")],
}