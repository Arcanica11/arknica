// src/app/[locale]/(public)/login/page.jsx

'use client'; // Esto es necesario para usar hooks como `useState` o `useForm`

import LoginForm from '@/components/modules/LoginForm';

export default function LoginPage() {
  const handleLogin = (data) => {
    // Lógica para manejar el inicio de sesión.
    // Por ahora, solo imprime los datos.
    console.log('Datos del formulario recibidos:', data);
    alert(`Intentando iniciar sesión con: ${data.email}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8">Iniciar Sesión</h1>
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </main>
  );
}