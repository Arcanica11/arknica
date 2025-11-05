// tailwind.config.mjs
// Importar fontFamily desde el tema por defecto de Tailwind
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Habilitar modo oscuro basado en la clase 'dark' en el HTML
  darkMode: ["class"],
  // Archivos donde Tailwind buscará clases para purgar en producción
  content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/**/*.{js,ts,jsx,tsx,mdx}',
],
  
  // Prefijo opcional para las clases de Tailwind (no se usa actualmente)
  prefix: "",
  // Tema base de Tailwind
  theme: {
    // Configuración del contenedor (centrado, padding)
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px", // Ancho máximo del contenedor en pantallas 2xl
      },
    },
    // Extensiones al tema por defecto
    extend: {
      // Definición de colores usando variables CSS (definidas en globals.css)
      colors: {
        border: 'rgb(var(--color-border))',
        input: 'rgb(var(--color-input))',
        ring: 'rgb(var(--color-ring))', // Color para outlines/focus rings
        background: 'rgb(var(--color-background))', // Fondo principal
        foreground: 'rgb(var(--color-foreground))', // Texto principal
        primary: {
          DEFAULT: 'rgb(var(--color-primary))', // Color primario (botones, etc.)
          foreground: 'rgb(var(--color-primary-foreground))', // Texto sobre color primario
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary))', // Color secundario
          foreground: 'rgb(var(--color-secondary-foreground))', // Texto sobre secundario
        },
        destructive: {
          DEFAULT: 'rgb(var(--color-destructive))', // Color para acciones destructivas (ej. borrar)
          foreground: 'rgb(var(--color-destructive-foreground))', // Texto sobre destructivo
        },
        muted: {
          DEFAULT: 'rgb(var(--color-muted))', // Color apagado (texto secundario, fondos sutiles)
          foreground: 'rgb(var(--color-muted-foreground))', // Texto sobre apagado
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent))', // Color de acento (hovers, estados activos)
          foreground: 'rgb(var(--color-accent-foreground))', // Texto sobre acento
        },
        // Puedes añadir más colores personalizados aquí si es necesario
      },
      // Definición de fuentes
      fontFamily: {
        // Fuente principal para el cuerpo de texto, usando la variable CSS de next/font
        sans: ['var(--font-inter)', ...fontFamily.sans],
        // Fuente para titulares/display
        display: ['Clash Display', 'sans-serif'], // Añadido fallback genérico
      },
      // Definición de tamaños de fuente personalizados (ej. para titulares)
      fontSize: {
        'h1': ['6rem', { lineHeight: '1.1', fontWeight: '600' }],
        'h2': ['4rem', { lineHeight: '1.2', fontWeight: '500' }],
        'h3': ['2.5rem', { lineHeight: '1.3', fontWeight: '500' }],
        'p': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // Tamaño de párrafo base
        'button': ['1.125rem', { lineHeight: '1', fontWeight: '600' }], // Tamaño para texto de botón
      },
      // Radio de borde (usando variable CSS --radius, que deberías definir en globals.css si no está)
      // Si no usas --radius, puedes usar valores directos como '0.5rem', '0.375rem', etc.
      borderRadius: {
        lg: "var(--radius, 0.75rem)", // Valor por defecto si --radius no está definido
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
      },
      // Puedes extender otras propiedades como keyframes para animaciones, etc.
      // keyframes: {
      //   "accordion-down": {
      //     from: { height: "0" },
      //     to: { height: "var(--radix-accordion-content-height)" },
      //   },
      //   "accordion-up": {
      //     from: { height: "var(--radix-accordion-content-height)" },
      //     to: { height: "0" },
      //   },
      // },
      // animation: {
      //   "accordion-down": "accordion-down 0.2s ease-out",
      //   "accordion-up": "accordion-up 0.2s ease-out",
      // },
    },
  },
  // Plugins de Tailwind
  plugins: [
    require("tailwindcss-animate"), // Plugin para animaciones (comúnmente usado con shadcn/ui)
    // Puedes añadir otros plugins aquí si los necesitas (ej. @tailwindcss/forms, @tailwindcss/typography)
  ],
};