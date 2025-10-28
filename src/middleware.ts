// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'; // Importar type CookieOptions
import { NextResponse, type NextRequest } from 'next/server'; // Importar tipos para Request y Response
import createIntlMiddleware from 'next-intl/middleware';

// --- CONFIGURACIÓN ---
const locales = ['en', 'es'];
const defaultLocale = 'es';
const publicPages = ['/', '/login']; // Rutas base públicas (sin locale)
const protectedPagesPrefix = '/dashboard'; // Prefijo para rutas protegidas

// Middleware de next-intl
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // No añade prefijo para el defaultLocale
});

export async function middleware(req: NextRequest) { // Añadir tipo NextRequest
  // 1. Manejo de locale por next-intl (crea una respuesta inicial)
  const res = intlMiddleware(req);

  // Obtener pathname y locale procesados por intlMiddleware
  // Nota: nextUrl ya incluye el locale si está presente en la URL
  const pathname = req.nextUrl.pathname;
  const locale = req.nextUrl.locale || defaultLocale;
  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`) ? pathname.substring(locale.length + 1) || '/' : pathname;


  // 2. Crear cliente Supabase específico para Middleware
  // Usamos NextResponse para poder setear cookies en la respuesta final
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // Añadir ! para indicar que no será undefined
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Añadir !
    {
      cookies: {
        get(name: string) { // Añadir tipo string
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) { // Añadir tipos
          // Si intlMiddleware ya creó una respuesta, usamos esa; si no, creamos una
          const response = res || NextResponse.next({ request: req });
          response.cookies.set({ name, value, ...options });
          // Devolvemos la respuesta actualizada para encadenar sets si es necesario
          // return response; // Ojo: Esto puede cambiar el flujo si se usa dentro del cliente
        },
        remove(name: string, options: CookieOptions) { // Añadir tipos
          const response = res || NextResponse.next({ request: req });
          response.cookies.set({ name, value: '', ...options });
          // return response;
        },
      },
    }
  );

  // 3. Obtener sesión del usuario
  const { data: { session } } = await supabase.auth.getSession();

  // 4. Lógica de protección de rutas
  // Verificar si la ruta actual (sin locale) es pública
  const isPublicPage = publicPages.includes(pathnameWithoutLocale);
  // Verificar si la ruta actual (sin locale) empieza con el prefijo protegido
  const isProtectedRoute = pathnameWithoutLocale.startsWith(protectedPagesPrefix);

  // Si es ruta protegida y NO hay sesión, redirigir a login (con locale)
  if (isProtectedRoute && !session) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    // Opcional: añadir `redirectedFrom` para devolver al usuario después de login
    // loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si HAY sesión y el usuario intenta acceder a login, redirigir a dashboard (con locale)
  const isLoginPage = pathnameWithoutLocale === '/login';
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // 5. Si todo está en orden, devolvemos la respuesta (generada por intlMiddleware o la original)
  return res;
}

// Configuración del matcher (sin cambios)
export const config = {
  matcher: [
    // Omitir rutas de API, _next/static, _next/image, assets, favicon.ico
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)'
  ],
};