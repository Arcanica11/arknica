// src/lib/supabase/server.js
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Asegúrate que las variables de entorno NEXT_PUBLIC_* estén definidas.
// Aunque se ejecuta en servidor, estas son las que usamos por convención aquí.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables existen
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing in environment variables for server client.");
}

// Helper para Server Components, Server Actions, Route Handlers
export function createSupabaseServerClient() {
  const cookieStore = cookies(); // Obtiene el store de cookies del contexto de la petición

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        // Función para obtener una cookie
        get(name) {
          return cookieStore.get(name)?.value;
        },
        // Función para establecer una cookie
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Esto puede fallar en escenarios específicos como Static Site Generation (SSG).
            // Dependiendo de tu caso de uso, puedes querer loggear el error
            // o simplemente ignorarlo si sabes que no impactará (ej. lectura anónima durante build).
            console.warn(`Failed to set cookie '${name}':`, error);
          }
        },
        // Función para remover una cookie
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Similar al caso de 'set'
            console.warn(`Failed to remove cookie '${name}':`, error);
          }
        },
      },
    }
  );
}

// Podrías añadir aquí funciones específicas de servidor si es necesario,
// por ejemplo, para obtener el usuario de la sesión de forma centralizada.
export async function getUserSession() {
  const supabase = createSupabaseServerClient();
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error("Error getting user session:", error.message);
    return null;
  }
}

export async function getUserProfile() {
  const supabase = createSupabaseServerClient();
  const session = await getUserSession();

  if (!session) return null;

  try {
    const { data: profile, error } = await supabase
      .from('usuarios') // Asumiendo que tu tabla de perfiles se llama 'usuarios'
      .select('id, nombre_completo, email, rol') // Ajusta los campos según tu schema
      .eq('id', session.user.id)
      .single();

    if (error) throw error;
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
}