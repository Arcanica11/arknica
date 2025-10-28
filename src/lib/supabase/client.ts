// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

// Añadir aserciones no nulas (!)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  // Mantener la validación por si acaso, aunque ! debería prevenirlo en build time
  throw new Error("Supabase URL or Anon Key is missing in environment variables.");
}

// Tipar la instancia del cliente para Singleton
// Usaremos 'any' por simplicidad aquí, pero podrías importar el tipo específico
// desde @supabase/supabase-js si lo tienes instalado como dependencia directa
let clientInstance: any | null = null; // Puedes reemplazar 'any' con 'SupabaseClient'

export function getSupabaseBrowserClient() {
  if (clientInstance) {
    return clientInstance;
  }
  // No necesitamos tipar aquí porque createBrowserClient está tipado
  clientInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return clientInstance;
}

// Esta función ya estaba correctamente tipada por inferencia
export function createClient() {
   return createBrowserClient(supabaseUrl, supabaseAnonKey);
}