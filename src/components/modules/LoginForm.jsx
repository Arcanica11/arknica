// src/components/modules/LoginForm.jsx

'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@ejemplo.com"
          {...register('email', { required: 'El correo electrónico es obligatorio' })}
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          {...register('password', { required: 'La contraseña es obligatoria' })}
        />
        {errors.password && (
          <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Iniciar Sesión
      </Button>
    </form>
  );
}