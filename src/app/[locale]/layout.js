// src/app/[locale]/layout.js
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata = {
  title: "Arknica Core",
  description: "Plantilla de aplicación para proyectos Arknica",
};

export default async function RootLayout({ children, params }) {
  const { locale } = params;
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}