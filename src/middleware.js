// src/middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// --- CONFIGURACIÓN ---
const locales = ['en', 'es'];
const publicPages = ["/", '/login']; 
const defaultLocale = 'es';
// --------------------

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

export async function middleware(req) {
  // 1. Aplica el middleware de i18n primero
  const res = intlMiddleware(req);
  
  // 2. Extrae la locale actual para las comprobaciones de ruta
  const pathname = req.nextUrl.pathname;
  const locale = locales.find(loc => pathname.startsWith(`/${loc}/`)) || defaultLocale;
  const pathnameWithoutLocale = pathname.startsWith(`/${locale}/`) 
    ? pathname.slice(`/${locale}`.length) 
    : pathname;

  // 3. Configura y utiliza el cliente de Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          // Si el middleware de i18n ya ha configurado una cookie, la respetamos
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          // Lo mismo para la eliminación
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // 4. Lógica de protección de rutas
  const { data: { session } } = await supabase.auth.getSession();
  const isPublicPage = publicPages.includes(pathnameWithoutLocale);

  if (!session && !isPublicPage) {
    // Si no hay sesión y la página no es pública, redirigir a login
    // Asegurándonos de mantener el prefijo de la locale
    const loginUrl = new URL(`/${locale}/`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Devolver la respuesta (modificada por i18n y Supabase)
  return res;
}

export const config = {
  matcher: [
    // Omitir rutas internas de Next.js y archivos estáticos
    '/((?!_next|.*\\..*).*)'
  ],
};