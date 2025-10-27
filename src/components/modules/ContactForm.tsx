// src/components/modules/ContactForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';
import { sendContactMessage } from '@/app/actions/contact-actions';

interface IFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Interfaz para el estado de la acción
interface FormState {
    success: boolean;
    message: string;
    errors?: Record<string, string[] | undefined>;
}

export default function ContactForm() {
  const t = useTranslations('common.contactForm');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<IFormInput>();

  const [formState, setFormState] = useState<FormState | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(async () => {
      setFormState(null); 
      const result = await sendContactMessage(formData);
      setFormState(result); 

      if (result.success) {
        reset();
      } else if (result.errors) {
        // Mapear errores de Zod a react-hook-form
        Object.entries(result.errors).forEach(([fieldName, fieldErrors]) => {
          // CORRECCIÓN: Comprobar que fieldErrors existe Y es un array
          if (fieldErrors && Array.isArray(fieldErrors)) { 
            setError(fieldName as keyof IFormInput, {
              type: 'server',
              message: fieldErrors.join(', '), // Ahora TypeScript sabe que .join es seguro
            });
          }
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       {/* Mensaje del Servidor */}
      {formState?.message && (
        <div
          className={cn(
            "p-4 rounded-md text-sm",
            formState.success ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : '',
            !formState.success ? 'bg-destructive/10 text-destructive dark:bg-destructive/20' : ''
          )}
        >
          {formState.message}
        </div>
      )}

      {/* Campo Nombre */}
      <div className="space-y-2">
        <Label htmlFor="name">{t('nameLabel')}</Label>
        <Input
          id="name"
          placeholder={t('namePlaceholder')}
          {...register('name', { required: t('nameRequired') })}
          disabled={isPending}
        />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </div>

       {/* Campo Email */}
       <div className="space-y-2">
        <Label htmlFor="email">{t('emailLabel')}</Label>
        <Input
          id="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          {...register('email', {
            required: t('emailRequired'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('emailInvalid'),
            },
          })}
          disabled={isPending}
        />
        {errors.email && (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        )}
      </div>

       {/* Campo Asunto */}
       <div className="space-y-2">
        <Label htmlFor="subject">{t('subjectLabel')}</Label>
        <Input
          id="subject"
          placeholder={t('subjectPlaceholder')}
          {...register('subject', { required: t('subjectRequired') })}
          disabled={isPending}
        />
        {errors.subject && (
          <p className="text-destructive text-sm">{errors.subject.message}</p>
        )}
      </div>

      {/* Campo Mensaje */}
      <div className="space-y-2">
        <Label htmlFor="message">{t('messageLabel')}</Label>
        <Textarea
          id="message"
          placeholder={t('messagePlaceholder')}
          rows={5}
          {...register('message', { required: t('messageRequired') })}
          disabled={isPending}
        />
        {errors.message && (
          <p className="text-destructive text-sm">{errors.message.message}</p>
        )}
      </div>

      {/* Botón de Envío */}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? t('submitLoading') : t('submitButton')}
      </Button>
    </form>
  );
}