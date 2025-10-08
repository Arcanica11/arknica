Manual de Integración Frontend: Arknica CRM con SupabaseArquitecto: KernoVersión: 1.2 (Fecha: 2025-10-08)1. Introducción y Filosofía de DiseñoEste documento es la única fuente de verdad para la interacción entre el frontend (Next.js) y el backend (Supabase). La arquitectura ha sido diseñada bajo una filosofía de "Seguridad por Defecto" y "Lógica en el Servidor".Principios Fundamentales (No Negociables):El Cliente es "Tonto" (Dumb Client): El frontend se encarga exclusivamente de la presentación y la captura de la entrada del usuario. NUNCA debe contener lógica de negocio, de permisos o de filtrado de datos basada en roles.La Base de Datos es la Fortaleza: Toda la seguridad y las reglas de acceso a los datos son gestionadas por las políticas de Row Level Security (RLS) de PostgreSQL. Si una consulta no devuelve datos, es porque el usuario no tiene permiso para verlos. El frontend no debe cuestionar esto.Las Mutaciones son Atómicas y Centralizadas: Todas las operaciones de escritura (Crear, Actualizar, Borrar) DEBEN realizarse a través de Next.js Server Actions. Estas acciones, a su vez, pueden llamar a funciones de la base de datos (RPC) para operaciones complejas, garantizando la integridad de los datos.Cero Exposición de Secretos: Las claves de Supabase (service_role o secret_key) NUNCA deben estar expuestas en el lado del cliente. Se utilizarán las claves SUPABASE_URL y SUPABASE_ANON_KEY para la comunicación segura.2. Traducción de Conceptos API REST a nuestra ArquitecturaEsta sección es crucial para entender por qué no existen rutas de API explícitas como GET /api/clientes. Nuestra arquitectura moderna con Supabase y Next.js Server Actions maneja estas operaciones de una manera más integrada y segura.2.1. Operaciones de Lectura (El Equivalente a GET)En una API REST tradicional, para obtener datos se haría una llamada fetch a un endpoint. En nuestra arquitectura, esto no es necesario.Cómo se implementa: Las lecturas de datos se realizan directamente desde los Server Components de Next.js utilizando la librería cliente de Supabase. La librería construye y ejecuta la petición GET segura bajo el capó.Seguridad: La autorización está garantizada por las políticas de RLS en la base de datos. Si un miembro intenta leer la tabla transacciones, la base de datos le devolverá un array vacío. No hay que programar esta lógica en el frontend.Ejemplo Práctico: Obtener todos los clientes// En un Server Component, ej: app/dashboard/clientes/page.jsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function PaginaClientes() {
  const supabase = createServerComponentClient({ cookies });
  const { data: clientes, error } = await supabase.from('clientes').select('*');

  if (error) { /* Manejar error */ }

  return (
    // ... renderizar la lista de clientes
  );
}
2.2. Operaciones de Escritura (El Equivalente a POST, UPDATE, DELETE)Las operaciones que modifican datos (crear, actualizar, borrar) son las más críticas. En lugar de endpoints POST, PUT o DELETE, usamos Next.js Server Actions. Una Server Action es una función que se escribe una sola vez pero se ejecuta de forma segura solo en el servidor.Cómo se implementa: Se define una función asíncrona en un archivo (ej. app/actions.js) con la directiva 'use server'. Esta función se importa en un componente de cliente (ej. un formulario) y se llama directamente desde el action de un <form> o un onClick.Seguridad: El código de la Server Action nunca se envía al navegador. Next.js crea automáticamente un endpoint RPC privado. Esto previene cualquier tipo de ataque de manipulación desde el cliente.Ejemplo Práctico: Crear, Actualizar y Borrar un Cliente// En un archivo centralizado, ej: app/actions/cliente-actions.js
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// --- Operación de Creación (POST) ---
export async function crearCliente(formData) {
  const supabase = createServerActionClient({ cookies });
  const rawFormData = {
    nombre_empresa: formData.get('nombre_empresa'),
    // ... otros campos del formulario
  };

  const { error } = await supabase.from('clientes').insert(rawFormData);
  if (error) return { message: 'Error al crear el cliente.' };

  revalidatePath('/dashboard/clientes'); // Actualiza la UI
  return { message: 'Cliente creado con éxito.' };
}

// --- Operación de Actualización (UPDATE / PUT) ---
export async function actualizarCliente(id, formData) {
  const supabase = createServerActionClient({ cookies });
  const rawFormData = {
    nombre_empresa: formData.get('nombre_empresa'),
    // ... otros campos del formulario
  };

  const { error } = await supabase.from('clientes').update(rawFormData).eq('id', id);
  if (error) return { message: 'Error al actualizar el cliente.' };

  revalidatePath('/dashboard/clientes');
  revalidatePath(`/dashboard/clientes/${id}`);
  return { message: 'Cliente actualizado con éxito.' };
}

// --- Operación de Borrado (DELETE) ---
export async function borrarCliente(id) {
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.from('clientes').delete().eq('id', id);
  if (error) return { message: 'Error al borrar el cliente.' };

  revalidatePath('/dashboard/clientes');
  return { message: 'Cliente borrado con éxito.' };
}
3. Autenticación y Roles de UsuarioEl sistema de autenticación es híbrido: se basa en auth.users de Supabase, pero se extiende con nuestra tabla public.usuarios para gestionar los roles internos.3.1. Tablas Involucradasauth.users: Tabla nativa de Supabase. Almacena la identidad principal (email, password).public.usuarios: Nuestra tabla de perfiles. Se vincula 1 a 1 con auth.users a través del id (UUID). Esta tabla es la fuente de verdad para el rol del usuario.3.2. Roles Definidosadmin: Control total sobre todas las entidades del sistema. Puede gestionar usuarios, servicios y finanzas.miembro: Rol operativo estándar. Puede gestionar clientes, proyectos, credenciales y prospectos, pero tiene acceso restringido o de solo lectura a entidades sensibles como servicios, usuarios y transacciones.3.3. Obtención del Rol del UsuarioEn el frontend, una vez que el usuario ha iniciado sesión, se debe realizar una consulta a la tabla usuarios para obtener su perfil y, lo más importante, su rol. Este rol debe estar disponible en un contexto global de la aplicación para adaptar la UI (ej. ocultar botones de "Administrar Servicios" si el rol no es admin).Ejemplo de consulta del perfil del usuario actual (Server Component):import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function getUserProfile() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return null;

  const { data: profile, error } = await supabase
    .from('usuarios')
    .select('id, nombre_completo, email, rol')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return profile;
}
4. Guía Detallada por Entidad (Tablas)A continuación, se detalla cada tabla, sus políticas de seguridad y cómo interactuar con ella.4.1. usuariosPropósito: Gestionar los perfiles del equipo interno.Políticas RLS:admin: Puede realizar CUALQUIER operación (SELECT, INSERT, UPDATE, DELETE) sobre CUALQUIER usuario.miembro: Solo puede ver (SELECT) y actualizar (UPDATE) su propio perfil (WHERE id = auth.uid()). No puede ver otros perfiles ni crear nuevos usuarios.4.2. clientes, proyectos, credenciales, prospectosPropósito: Son las tablas operativas principales.Políticas RLS (Unificadas):Cualquier usuario autenticado (sea admin o miembro) tiene permisos completos (SELECT, INSERT, UPDATE, DELETE) sobre estas tablas. La lógica de negocio no restringe el acceso entre miembros del equipo para estas entidades.4.3. serviciosPropósito: Catálogo maestro de servicios que ofrece Arknica.Políticas RLS:admin: Permisos completos (SELECT, INSERT, UPDATE, DELETE).miembro: SOLO LECTURA (SELECT). No puede crear, editar o borrar servicios. La UI debe reflejar esto ocultando los botones correspondientes.4.4. proyecto_serviciosPropósito: Tabla pivote que conecta un proyecto con los servicios que incluye.Políticas RLS:Cualquier usuario autenticado (admin o miembro) tiene permisos completos.4.5. transaccionesPropósito: LA TABLA MÁS SENSIBLE. Registra cada movimiento financiero.Políticas RLS:admin: ACCESO EXCLUSIVO Y TOTAL.miembro: SIN ACCESO. Cualquier intento de consulta (SELECT, INSERT, etc.) por parte de un miembro devolverá un array vacío o un error de RLS. La UI de finanzas debe ser completamente inaccesible para este rol.4.6. registros_de_tiempoPropósito: Registrar horas trabajadas por el equipo en proyectos específicos.Políticas RLS:admin: Puede ver (SELECT) todos los registros de tiempo de todos los usuarios.miembro: Puede crear, ver, actualizar y borrar (ALL) únicamente sus propios registros (WHERE usuario_id = auth.uid()).5. Funciones de Base de Datos (Lógica de Negocio Centralizada)Para operaciones críticas que involucran múltiples pasos, hemos creado funciones de PostgreSQL. Estas DEBEN ser llamadas desde las Server Actions usando supabase.rpc().5.1. convertir_prospecto_a_clientePropósito: Convierte atómicamente un prospecto en un cliente. Realiza dos operaciones en una sola transacción segura: INSERT en clientes y UPDATE en prospectos.Parámetros:prospecto_id_param (UUID): El id del prospecto que se va a convertir.Retorna: El id (UUID) del nuevo cliente creado.Uso desde una Server Action:'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function convertProspectToClient(prospectId) {
  const supabase = createServerActionClient({ cookies });

  const { data: newClientId, error } = await supabase.rpc(
    'convertir_prospecto_a_cliente',
    { prospecto_id_param: prospectId }
  );

  if (error) {
    console.error("Error en RPC convertir_prospecto_a_cliente:", error);
    return { error: 'No se pudo convertir el prospecto.' };
  }

  // Revalidar rutas o redirigir
  // ...
  return { success: true, newClientId };
}
6. Mapeo de Rutas del Frontend a la Lógica de BackendEsta sección detalla qué datos y acciones se esperan en cada ruta principal de la aplicación.6.1. Dashboard (/dashboard)Permisos: admin, miembro.Datos Requeridos:Estadísticas agregadas (ej. SELECT count(*) FROM clientes).Lista de los últimos prospectos (SELECT * FROM prospectos WHERE estado = 'nuevo' ORDER BY creado_en DESC LIMIT 5).Acciones: Navegación a otras secciones.6.2. Clientes (/dashboard/clientes y /dashboard/clientes/[id])Permisos: admin, miembro.Datos Requeridos:En .../clientes: Lista completa de la tabla clientes.En .../clientes/[id]: Los datos del cliente específico, y una consulta anidada para traer sus proyectos (supabase.from('clientes').select('*, proyectos(*)').eq('id', clientId).single()).Acciones:Crear/Editar/Borrar clientes.Desde la vista de detalle de un cliente, poder crear un nuevo proyecto asociado a él.6.3. Proyectos (/dashboard/proyectos/[id])Permisos: admin, miembro.Datos Requeridos:Datos del proyecto.Datos del cliente asociado.Lista de credenciales (credenciales).Lista de servicios asociados (proyecto_servicios).Lista de registros de tiempo (registros_de_tiempo).Acciones:Crear/Editar/Borrar credenciales.Asociar/Desasociar servicios al proyecto.Registrar tiempo en el proyecto (para el usuario logueado).6.4. Finanzas (/dashboard/finanzas)Permisos: SOLO admin. La ruta debe estar protegida a nivel de layout o middleware, verificando el rol del usuario.Datos Requeridos:Lista completa de transacciones.Agregaciones (SUM, GROUP BY) para generar reportes de ingresos vs. egresos.Acciones:Crear/Editar/Borrar transacciones.Asociar transacciones a proyectos o clientes.6.5. Configuración / Equipo (/dashboard/equipo)Permisos: SOLO admin.Datos Requeridos: Lista completa de usuarios.Acciones:Invitar nuevos usuarios (esto se hace con supabase.auth.admin.inviteUserByEmail()).Cambiar el rol de un usuario existente (UPDATE en la tabla usuarios).Eliminar un usuario (DELETE en usuarios y supabase.auth.admin.deleteUser()).7. Diagrama de Relaciones (Visual)Este diagrama muestra todas las tablas y sus relaciones. El código a continuación utiliza la sintaxis de Mermaid, que se renderizará como un diagrama visual en plataformas compatibles.erDiagram
    usuarios {
        UUID id PK
        varchar nombre_completo
        varchar email
        text rol
    }
    clientes {
        UUID id PK
        varchar nombre_empresa
    }
    proyectos {
        UUID id PK
        UUID cliente_id FK
        varchar nombre_proyecto
    }
    servicios {
        UUID id PK
        varchar nombre
    }
    credenciales {
        UUID id PK
        UUID proyecto_id FK
    }
    proyecto_servicios {
        BIGINT id PK
        UUID proyecto_id FK
        UUID servicio_id FK
    }
    transacciones {
        BIGINT id PK
        UUID proyecto_id FK
        UUID cliente_id FK
    }
    registros_de_tiempo {
        BIGINT id PK
        UUID usuario_id FK
        UUID proyecto_id FK
    }

    clientes ||--|{ proyectos : "tiene"
    proyectos ||--|{ credenciales : "contiene"
    proyectos ||--|{ proyecto_servicios : "compuesto por"
    servicios ||--|{ proyecto_servicios : "es parte de"
    proyectos ||--o{ transacciones : "genera"
    clientes ||--o{ transacciones : "asociada a"
    proyectos ||--|{ registros_de_tiempo : "consume"
    usuarios ||--|{ registros_de_tiempo : "registra"
