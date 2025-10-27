// src/app/actions/contact-actions.ts
'use server';

import { z } from 'zod'; // Usaremos Zod para validación del lado del servidor

// Definir esquema de validación con Zod (más robusto que solo lado cliente)
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." })
});

// Tipado para el estado de la respuesta de la acción
interface FormState {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>; // Para errores de validación específicos
}


// La Server Action
export async function sendContactMessage(
    // prevState: FormState | null, // Para useFormState si se usa
    formData: FormData // Recibe FormData directamente
): Promise<FormState> { // Devuelve una promesa con el estado

  // 1. Extraer datos de FormData
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  // 2. Validar datos con Zod
  const validatedFields = ContactFormSchema.safeParse(rawFormData);

  // Si la validación falla, devolver errores
  if (!validatedFields.success) {
      console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Procesar los datos validados (validatedFields.data)
  // --- Aquí iría la lógica real ---
  // - Enviar un email (usando un servicio como Resend, SendGrid)
  // - Guardar el lead en la base de datos Supabase (en una tabla 'leads' o 'contact_messages')
  // - Notificar a Slack, etc.

  console.log("Datos validados recibidos en Server Action:", validatedFields.data);

  // Simular éxito por ahora
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 4. Devolver respuesta de éxito
  return {
    success: true,
    message: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
  };

  // --- Ejemplo manejo de error genérico ---
  // try {
  //   // ... Lógica de envío ...
  //   return { success: true, message: "Éxito..." };
  // } catch (error) {
  //   console.error("Server Action Error:", error);
  //   return { success: false, message: "Error interno del servidor. Inténtalo más tarde." };
  // }
}