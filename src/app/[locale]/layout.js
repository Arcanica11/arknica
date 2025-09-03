// src/app/[locale]/layout.jsx
import "../globals.css";

export const metadata = {
  title: "Arknica Core",
  description: "Plantilla de aplicación para proyectos Arknica",
};

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}