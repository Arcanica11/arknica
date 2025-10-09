// src/app/[locale]/layout.jsx
import "./globals.css";
import "@fontsource/inter";
import {NextIntlClientProvider} from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata = {
  title: "Arknica Core",
  description: "Plantilla de aplicación para proyectos Arknica",
};

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}