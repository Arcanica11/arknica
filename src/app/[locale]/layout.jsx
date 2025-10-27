// src/app/[locale]/layout.jsx
import './globals.css';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

// --- Configuración de Fuentes ---
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// --- Generación de Metadata ---
// Define la URL base de tu sitio web (¡importante para SEO!)
// Reemplaza 'https://arknica.com' con tu dominio real cuando lo tengas.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Usa una variable de entorno o un valor por defecto

export async function generateMetadata({ params: { locale } }) {
  // Obtener traducciones para la sección 'metadata'
  // Usaremos 'common.metadata' y 'common.hero' para obtener textos relevantes
  const t = await getTranslations({ locale, namespace: 'common' });

  // Define palabras clave relevantes para Arknica
  const keywords = locale === 'es'
    ? ['desarrollo web', 'aplicaciones móviles', 'automatizaciones', 'asistentes IA', 'soluciones digitales', 'startup', 'pymes', 'emprendedores', 'Next.js', 'React', 'Supabase', 'Vercel']
    : ['web development', 'mobile apps', 'automations', 'AI assistants', 'digital solutions', 'startup', 'smbs', 'entrepreneurs', 'Next.js', 'React', 'Supabase', 'Vercel'];

  return {
    // --- Metadata General ---
    metadataBase: new URL(BASE_URL), // Establece la URL base para metadatos relativos
    title: {
      default: t('metadata.title'), // Título principal (ej: "Arknica Tec")
      template: `%s | ${t('metadata.title')}`, // Plantilla (ej: "Servicios | Arknica Tec")
    },
    description: t('metadata.description'), // Descripción principal
    keywords: keywords, // Palabras clave para SEO
    authors: [{ name: 'Arknica Team', url: BASE_URL }], // Autores
    creator: 'Arknica Tec',
    publisher: 'Arknica Tec',
    alternates: { // Indica las versiones en otros idiomas
      canonical: `/${locale}`,
      languages: {
        'es-CO': '/es', // Puedes ser más específico con la región si quieres
        'en-US': '/en',
      },
    },

    // --- Open Graph (para redes sociales como Facebook, LinkedIn) ---
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url: `${BASE_URL}/${locale}`, // URL específica del locale
      siteName: 'Arknica Tec',
      images: [
        {
          url: '/og-image.png', // ¡Asegúrate de crear y colocar esta imagen en /public! (1200x630px recomendado)
          width: 1200,
          height: 630,
          alt: `Logo de ${t('metadata.title')}`,
        },
      ],
      locale: locale === 'es' ? 'es_CO' : 'en_US', // Formato de locale para OG
      type: 'website',
    },

    // --- Twitter Card (para Twitter/X) ---
    twitter: {
      card: 'summary_large_image', // Tipo de tarjeta
      title: t('metadata.title'),
      description: t('metadata.description'),
      // siteId: '@tuUsuarioTwitter', // Opcional: ID de sitio de Twitter
      // creator: '@tuUsuarioTwitter', // Opcional: Creador de contenido
      images: [`${BASE_URL}/og-image.png`], // Imagen para la tarjeta (usa la misma que OG o una específica)
    },

    // --- Favicons y otros iconos ---
    icons: {
      icon: [ // Puedes definir múltiples tamaños/tipos
        { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
        { url: '/iconArk.png', type: 'image/png' }, // Usa tu iconArk.png
      ],
      apple: '/apple-touch-icon.png', // Icono para Apple (crea esta imagen en /public)
      // Puedes añadir más aquí (shortcut, etc.)
    },

    // --- Robots (Instrucciones para motores de búsqueda) ---
    robots: {
      index: true, // Permitir indexación
      follow: true, // Permitir seguir enlaces
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // --- Manifest (para PWA, si aplica en el futuro) ---
    // manifest: '/manifest.json', // Si decides hacerla una PWA

    // --- Verificación de Sitio (ej. Google Search Console) ---
    // verification: {
    //   google: 'TU_CODIGO_DE_VERIFICACION_GOOGLE',
    //   // otros motores de búsqueda...
    // },
  };
}


// --- Componente Layout ---
export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} font-sans h-full`} suppressHydrationWarning>
      <head>
        {/* Clash Display - cargado externamente */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500&display=swap"
          rel="stylesheet"
        />
        {/* Otros elementos <head> si son necesarios */}
      </head>
      {/* Añadido h-full a body y flex para asegurar que el footer se quede abajo */}
      <body className="flex flex-col min-h-full">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Añadido flex-grow para que el contenido principal empuje el footer */}
          <div className="flex-grow">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}