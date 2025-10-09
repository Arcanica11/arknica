// src/middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// --- CONFIGURACIÓN ---
const locales = ['en', 'es'];
const defaultLocale = 'es';
const publicPages = ['/', '/login']; // Rutas base, el middleware las localizará.

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export async function middleware(req) {
  // 1. Primero, delegamos el manejo de la ruta y el locale a next-intl.
  const res = intlMiddleware(req);

  // El pathname ya estará localizado (ej. /es/login) por el middleware anterior.
  const pathname = req.nextUrl.pathname;
  const locale = req.nextUrl.locale || defaultLocale;

  // 2. Creamos el cliente de Supabase.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return req.cookies.get(name)?.value; },
        set(name, value, options) { res.cookies.set({ name, value, ...options }); },
        remove(name, options) { res.cookies.set({ name, value: '', ...options }); },
      },
    }
  );

  // 3. Obtenemos la sesión del usuario.
  const { data: { session } } = await supabase.auth.getSession();

  // 4. Lógica de protección de rutas.
  // This logic correctly handles the "as-needed" locale prefix strategy.
  const isPublicPage = publicPages.some(p => {
    // If the locale is the default, the path won't be prefixed.
    if (locale === defaultLocale) {
      // This handles both '/' and '/login' for the default locale.
      return pathname === p;
    }
    // For other locales, the path will be prefixed.
    // We also need to handle the root case (e.g., '/en' for '/').
    const localizedPath = `/${locale}${p === '/' ? '' : p}`;
    return pathname === localizedPath;
  });

  // Si es una ruta protegida (no pública) y no hay sesión, redirigir al login.
  if (!isPublicPage && !session) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // If a session exists and the user is trying to access the login page, redirect to the dashboard.
  const isLoginPage = pathname === `/${locale}/login` || (pathname === '/login' && locale === defaultLocale);
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // 5. Si todo está en orden, devolvemos la respuesta.
  return res;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};