// src/app/[locale]/(public)/login/page.tsx

'use client'; // Necesario para hooks como useForm, useState

import React from 'react'; // <--- Añadido import
import LoginForm from '@/components/modules/LoginForm'; // Asumiendo que LoginForm ya es .tsx
import { useTranslations } from 'next-intl'; // Importar hook de traducciones

export default function LoginPage() {
  const t = useTranslations('common.login'); // Obtener traducciones para la página de login
  
  // Tipar explícitamente los datos esperados del formulario (si es necesario)
  // Basado en LoginForm, espera { email: string, password: string }
  // Aunque para la acción signInWithPassword, recibe FormData directamente.
  const handleLogin = (formData: FormData) => {
    // La lógica real ahora está en la Server Action 'signInWithPassword'
    // Este handler podría usarse para validación adicional del lado cliente si fuera necesario,
    // pero el <form action={}> se encargará del envío directo a la Server Action.
    
    // Si NO usas <form action={}> sino handleSubmit(onSubmit), entonces llamarías a la acción aquí.
    // Ejemplo:
    // import { signInWithPassword } from '@/app/actions/auth-actions';
    // signInWithPassword(formData).then(result => { ... manejo de resultado ... });

    console.log('El formulario se enviará a la Server Action.');
  };

  return (
    // Añadir padding top para compensar header fijo, y flex-grow para ocupar espacio
    <main className="flex flex-col items-center justify-center min-h-screen py-32 px-4 flex-grow">
      {/* Contenedor con ancho máximo */}
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-md border border-border"> {/* Estilo de Card */}
        <h1 className="text-2xl font-semibold font-display text-center mb-8">{t('title')}</h1>
        {/* Aquí pasamos la Server Action directamente al 'action' del formulario */}
        <LoginForm
            // Pasar la Server Action directamente si LoginForm la acepta como prop 'action'
            // O, si LoginForm maneja la lógica de envío con handleSubmit,
            // pasar un handler que cree FormData y llame a la Server Action.
            // Por simplicidad, asumiremos que LoginForm aceptará un 'action'.
            // formAction={signInWithPassword} // Necesitaríamos modificar LoginForm para aceptar esto
            // O mantener el onSubmit y llamarlo desde ahí
            onSubmit={handleLogin} // Mantener onSubmit por ahora, LoginForm llamará a la action
        />
        {/* Aquí podrías añadir enlaces como "¿Olvidaste tu contraseña?" */}
      </div>
    </main>
  );
}