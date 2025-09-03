// src/app/actions/auth-actions.js
'use server'; // Directiva que lo define como Server Action

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signInWithPassword(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const cookieStore = cookies();

  // Crear cliente de Supabase para Server Actions
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Lógica de inicio de sesión
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // En una implementación real, devolveríamos un mensaje de error específico.
    console.error('Error de autenticación:', error.message);
    // Podríamos redirigir a la página de login con un parámetro de error.
    return redirect('/login?error=invalid_credentials');
  }

  // Si el inicio de sesión es exitoso, redirigir al dashboard.
  return redirect('/dashboard');
}