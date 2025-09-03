// src/middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// --- CONFIGURACIÓN ---
const locales = ['en', 'es'];
const defaultLocale = 'es';
const publicPages = ['/', '/login'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Lógica de Supabase: Crea un cliente para manejar la sesión
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const isProtectedRoute = !publicPages.some(page => pathname.includes(page));

  // Si hay sesión y la ruta es pública, redirige al dashboard.
  if (session && !isProtectedRoute) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = `/es/dashboard`; // Redirección explícita a la ruta protegida
    return NextResponse.redirect(dashboardUrl);
  }

  // Si no hay sesión y la ruta es privada, redirige al login.
  if (!session && isProtectedRoute) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/es/login`;
    return NextResponse.redirect(loginUrl);
  }

  // Si todo está bien, simplemente pasa el control al siguiente middleware (intlMiddleware).
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};