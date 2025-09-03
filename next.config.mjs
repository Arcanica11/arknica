// next.config.mjs

import createWithIntl from 'next-intl/plugin';

const withIntl = createWithIntl('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // En el futuro, cualquier otra configuración de Next.js irá aquí dentro.
};

// Envolvemos la configuración con el plugin de next-intl.
export default withIntl(nextConfig);