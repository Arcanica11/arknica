// src/app/[locale]/layout.js
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
 
export const metadata = {
  title: "Arknica Core",
  description: "Plantilla de aplicación para proyectos Arknica",
};
 
export default async function RootLayout({children, params: {locale}}) {
  const {messages} = await getRequestConfig({locale});
 
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