// src/lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr' // Importar CookieOptions
import { cookies } from 'next/headers'
// Opcional: Importar tipos de Supabase si es necesario un tipado más estricto
// import { SupabaseClient, Session, User } from '@supabase/supabase-js';

// Añadir aserciones no nulas (!)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing in environment variables for server client.");
}

// Helper para crear cliente en Server Components/Actions/Route Handlers
// El tipo de retorno es inferido correctamente por createServerClient
export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        // Añadir tipos explícitos a los parámetros
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.warn(`[Supabase Server Client] Failed to set cookie '${name}':`, error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            console.warn(`[Supabase Server Client] Failed to remove cookie '${name}':`, error);
          }
        },
      },
    }
  );
}

// Helper para obtener la sesión (tipado opcional añadido)
export async function getUserSession(): Promise<Session | null> { // Añadido tipo de retorno Session | null
  const supabase = createSupabaseServerClient();
  try {
    // Tipar la respuesta ayuda a la autocompletación
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error: any) { // Tipar el error capturado
    console.error("Error getting user session:", error.message);
    return null;
  }
}

// Interfaz para el perfil de usuario (ajusta según tu tabla 'usuarios')
interface UserProfile {
    id: string;
    nombre_completo: string | null;
    email: string | null;
    rol: 'admin' | 'miembro'; // Usar tipos literales para roles
    // Añade otros campos si los tienes
}

// Helper para obtener el perfil (tipado añadido)
export async function getUserProfile(): Promise<UserProfile | null> { // Añadido tipo de retorno UserProfile | null
  const supabase = createSupabaseServerClient();
  const session = await getUserSession();

  if (!session) return null;

  try {
     // Seleccionar explícitamente las columnas y usar la interfaz para tipar 'data'
    const { data: profile, error } = await supabase
      .from('usuarios')
      .select('id, nombre_completo, email, rol') // Asegúrate que estas columnas existan
      .eq('id', session.user.id)
      .single<UserProfile>(); // Aplicar el tipo a la respuesta de .single()

    // Manejar error de Supabase (ej. si no se encuentra el perfil)
    if (error) {
        // Podrías diferenciar entre error de red y perfil no encontrado si es necesario
        console.error("Supabase error fetching user profile:", error.message);
        return null;
    }
     // Validar si el perfil realmente se obtuvo (single() puede devolver null sin error si no hay match)
     if (!profile) {
        console.warn(`Profile not found for user ID: ${session.user.id}`);
        return null;
     }

    return profile;
  } catch (error: any) { // Tipar error capturado
    console.error("Generic error fetching user profile:", error.message);
    return null;
  }
}