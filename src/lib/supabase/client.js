// src/lib/supabase/client.js
import { createBrowserClient } from '@supabase/ssr'

// Asegúrate que las variables de entorno NEXT_PUBLIC_* estén definidas en .env.local
// y accesibles en el navegador.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables existen para evitar errores en runtime
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing in environment variables.");
}

// Función para crear una instancia Singleton del cliente en el navegador
let clientInstance = null;

export function getSupabaseBrowserClient() {
  if (clientInstance) {
    return clientInstance;
  }

  clientInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return clientInstance;
}

// También puedes exportar una función que siempre cree uno nuevo si prefieres
export function createClient() {
   return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Nota: Usa getSupabaseBrowserClient si quieres reutilizar la misma instancia
// a través de tu aplicación cliente para potencialmente optimizar conexiones.
// Usa createClient si prefieres instancias separadas.