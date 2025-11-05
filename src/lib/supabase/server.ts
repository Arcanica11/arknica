import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// --- ¡ESTA LÍNEA ES LA CORRECCIÓN CLAVE! ---
// Importamos el TIPO SupabaseClient desde el paquete.
import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing in environment variables for server client.");
}

// --- ¡Y ESTA LÍNEA TAMBIÉN! ---
// Le decimos a TypeScript que nuestra función devuelve el TIPO real.
type AppSupabaseClient = SupabaseClient;

export function createSupabaseServerClient(): AppSupabaseClient {
  const cookieStore = cookies();

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // --- CORRECCIÓN AQUÍ ---
            // 1. Usamos 'as any' para saltar el error de "solo lectura".
            // 2. Pasamos los argumentos separados, no un objeto.
            (cookieStore as any).set(name, value, options);
          } catch (error) {
            // El error se capturará si 'set' se llama desde un Server Component (que es de solo lectura)
            console.warn(`[Supabase Server Client] Failed to set cookie '${name}':`, error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // --- CORRECCIÓN AQUÍ ---
            // 1. Usamos 'as any' para saltar el error de "solo lectura".
            // 2. Pasamos los argumentos separados, no un objeto.
            (cookieStore as any).set(name, '', options);
          } catch (error) {
            // El error se capturará si 'remove' se llama desde un Server Component
            console.warn(`[Supabase Server Client] Failed to remove cookie '${name}':`, error);
          }
        },
      },
    }
  );
}

// Helper para obtener la sesión (Sin cambios, ya estaba bien)
export async function getUserSession(): Promise<Session | null> {
  const supabase = createSupabaseServerClient();
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error: any) {
    console.error("Error getting user session:", error.message);
    return null;
  }
}

// Interfaz para el perfil de usuario (Sin cambios, ya estaba bien)
export interface UserProfile {
    id: string;
    nombre_completo: string | null;
    email: string | null;
    rol: 'admin' | 'miembro'; 
}

// Helper para obtener el perfil (Sin cambios, ya estaba bien)
// Dentro de src/lib/supabase/server.ts (o donde tengas esta función)

export async function getUserProfile(): Promise<UserProfile | null> {
// --- CORRECCIÓN: Línea inválida eliminada ---
  const supabase = createSupabaseServerClient();
  const session = await getUserSession();

  if (!session?.user) {
      console.log("No active session found.");
      return null;
  }

  try {
    // Ahora TypeScript entenderá '.single<UserProfile>()' 
    // porque 'supabase' ya no es 'any'
    const { data: profile, error } = await supabase
      .from('usuarios')
      .select('id, nombre_completo, email, rol') 
      .eq('id', session.user.id)
      .single<UserProfile>(); 

    if (error) {
        console.error("Supabase error fetching user profile:", error.message);
        return null;
    }
     if (!profile) {
        console.warn(`Profile not found in 'usuarios' table for user ID: ${session.user.id}`);
        return null;
     }
     if (typeof profile.rol === 'undefined') {
         console.error(`ERROR CRÍTICO: La columna 'rol' no fue devuelta por Supabase para el usuario ${session.user.id}. Verifica la tabla 'usuarios' y las políticas RLS.`);
         return null;
     }

    return profile;
  } catch (error: any) {
    console.error("Generic error fetching user profile:", error.message);
    return null;
  }
}

// Helper específico para obtener solo el rol (Sin cambios, ya estaba bien)
export async function getUserRole(): Promise<'admin' | 'miembro' | null> {
    const profile = await getUserProfile();
    if (profile && profile.rol) {
        return profile.rol;
    }
    return null;
}