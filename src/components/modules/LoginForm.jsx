// src/components/modules/LoginForm.jsx

'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Hook para obtener las traducciones del contexto.
  const t = useTranslations('common.login');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">{t('usernameLabel')}</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@ejemplo.com"
          {...register('email', { required: t('usernameRequired') })}
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">{t('passwordLabel')}</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          {...register('password', { required: t('passwordRequired') })}
        />
        {errors.password && (
          <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {t('submitButton')}
      </Button>
    </form>
  );
}