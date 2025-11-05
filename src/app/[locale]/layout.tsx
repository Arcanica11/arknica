// src/app/[locale]/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import React from 'react'; // Asegurarse que React esté importado

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Metadata (asumiendo que está definida correctamente en tu archivo original)
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'common.metadata' });
  
  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: BASE_URL,
      siteName: t('title'),
      // images: [ ... ] // Puedes añadir una imagen OG aquí
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      // images: [ ... ] // Puedes añadir una imagen de Twitter aquí
    },
  };
}

// Tipar props del layout
interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} font-sans h-full`} suppressHydrationWarning>
      <head>
        {/* Font para titulares */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-full">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="flex-grow">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}