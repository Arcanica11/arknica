// i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation'; // Importar notFound para manejo de locales inválidos

// Lista de locales soportados (puede venir de una variable de entorno o config si prefieres)
const locales = ['en', 'es'];

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale extraído de la URL sea soportado
  if (!locales.includes(locale as any)) notFound(); // Si no, mostrar página 404

  // Cargar mensajes para el locale solicitado
  // Usamos `default` porque los archivos JSON se importan como objetos con una propiedad 'default'
  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    messages
    // Puedes añadir otros props globales de i18n aquí si es necesario, como formatos
    // formats: { ... }
  };
});