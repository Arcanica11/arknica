// src/components/modules/LoginForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';
// NOTA: Aún necesitamos crear 'signInWithPassword' en 'auth-actions.ts'
// import { signInWithPassword } from '@/app/actions/auth-actions';

// Interfaz para el estado de la acción
interface FormState {
  success: boolean;
  message: string;
}

// Interfaz de los campos del formulario
interface IFormInput {
  username: string; // O 'email' si prefieres
  password: string;
}

export default function LoginForm() {
  const t = useTranslations('common.login');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [formState, setFormState] = useState<FormState | null>(null);
  const [isPending, startTransition] = useTransition();

  // Esta función manejará el envío a la futura Server Action
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    startTransition(async () => {
      setFormState(null);
      
      // --- ¡ACCIÓN PENDIENTE! ---
      // Aquí llamaremos a la Server Action cuando esté creada
      // const result = await signInWithPassword(formData);
      // setFormState(result);

      // --- Placeholder mientras se crea la acción ---
      console.log("Enviando formulario...", data);
      // Simulación de error (puedes quitar esto)
      setFormState({ success: false, message: t('invalidCredentialsError') });
      // ------------------------------------------
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Mensaje de Error del Servidor */}
      {formState && !formState.success && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {formState.message}
        </div>
      )}

      {/* Campo Usuario */}
      <div className="space-y-2">
        <Label htmlFor="username">{t('usernameLabel')}</Label>
        <Input
          id="username"
          {...register('username', { required: t('usernameRequired') })}
          disabled={isPending}
        />
        {errors.username && (
          <p className="text-destructive text-sm">{errors.username.message}</p>
        )}
      </div>

      {/* Campo Contraseña */}
      <div className="space-y-2">
        <Label htmlFor="password">{t('passwordLabel')}</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { required: t('passwordRequired') })}
          disabled={isPending}
        />
        {errors.password && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Botón de Envío */}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Ingresando..." : t('submitButton')}
      </Button>
    </form>
  );
}