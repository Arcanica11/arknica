// next.config.mjs
import createWithIntl from 'next-intl/plugin';

// CORRECCIÓN: Apunta al archivo .ts
const withIntl = createWithIntl('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // En el futuro, cualquier otra configuración de Next.js irá aquí dentro.
};

// Envolvemos la configuración con el plugin de next-intl.
export default withIntl(nextConfig);