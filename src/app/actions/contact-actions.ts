// src/app/actions/contact-actions.ts
'use server';

import { z } from 'zod';
// CORRECCIÓN: Importar el helper correcto de server.js (o renombrar el archivo a .ts y exportar desde ahí)
// Asumiendo que renombraste server.js a server.ts y exportaste la función:
import { createSupabaseServerClient } from '@/lib/supabase/server'; // Asegúrate que la ruta y exportación sean correctas
import { revalidatePath } from 'next/cache'; // Para futuras actualizaciones de UI si mostramos leads

// Esquema de validación Zod (sin cambios)
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }), // Permitir asunto opcional si prefieres: .optional()
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." })
});

// Interfaz FormState (sin cambios)
interface FormState {
    success: boolean;
    message: string;
    errors?: Record<string, string[] | undefined>;
}


// La Server Action actualizada
export async function sendContactMessage(
    formData: FormData
): Promise<FormState> {

  // 1. Extraer datos (sin cambios)
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  // 2. Validar datos (sin cambios)
  const validatedFields = ContactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
      console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Procesar datos validados - LÓGICA DE SUPABASE AÑADIDA
  // Crear cliente Supabase para Server Action
  const supabase = createSupabaseServerClient(); // Usar el helper importado

  try {
    // Intentar insertar los datos en la tabla 'contact_messages'
    // Asegúrate que los nombres de campo coincidan con tu tabla Supabase
    const { error } = await supabase
      .from('contact_messages') // Nombre de tu tabla
      .insert([
        {
          name: validatedFields.data.name,
          email: validatedFields.data.email,
          subject: validatedFields.data.subject, // Asegúrate que tu tabla acepte null si es opcional
          message: validatedFields.data.message,
          // 'is_read' tendrá su valor por defecto (false)
        },
      ]);

    // Si hubo un error en la inserción
    if (error) {
      console.error("Supabase Insert Error:", error);
      throw new Error("Error al guardar el mensaje en la base de datos."); // Lanzar error para capturarlo abajo
    }

    // Opcional: Revalidar una ruta si tienes una página que muestra los leads/mensajes
    // revalidatePath('/dashboard/leads'); // Ejemplo

    // 4. Devolver respuesta de éxito si todo fue bien
    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
    };

  } catch (error) {
    // Capturar cualquier error (validación Zod o Supabase)
    console.error("Server Action Error:", error);
    // Devolver un mensaje de error genérico al cliente
    return {
      success: false,
      message: "Error interno del servidor. No se pudo enviar el mensaje. Inténtalo más tarde.",
    };
  }
}