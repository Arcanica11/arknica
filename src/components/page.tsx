// src/components/page.tsx
// Nota: Este archivo parece ser una página de prueba y no está en la estructura 'app'.
// Si es así, puedes moverlo o eliminarlo si ya no es necesario.
// Si es una ruta real bajo 'src/app', asegúrate que esté en la carpeta correcta.

import React from 'react'; // <--- Añadido import
import { Button } from "@/components/ui/Button"; // Asumimos extensión .tsx
import { Mail } from "lucide-react";

// Como es un componente de página, debería ser export default
export default function ComponentTestPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 gap-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Prueba de Componente: Button</h1>

      {/* --- Variantes de Estilo --- */}
      <h2 className="text-lg font-semibold mt-4">Variantes de Estilo</h2>
      <div className="flex items-center gap-4 flex-wrap"> {/* Añadido flex-wrap */}
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      {/* --- Variantes de Tamaño --- */}
      <h2 className="text-lg font-semibold mt-4">Variantes de Tamaño</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <Button size="lg">Large Size</Button>
        <Button size="default">Default Size</Button>
        <Button size="sm">Small Size</Button>
      </div>

      {/* --- Prueba con Ícono --- */}
      <h2 className="text-lg font-semibold mt-4">Prueba con Ícono</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <Button>
          <Mail className="mr-2 h-4 w-4" /> Login with Email
        </Button>
        <Button variant="outline" size="icon">
          <Mail className="h-4 w-4" />
          <span className="sr-only">Email Icon Button</span> {/* Accesibilidad */}
        </Button>
      </div>

       {/* Prueba Estado Deshabilitado */}
       <h2 className="text-lg font-semibold mt-4">Estado Deshabilitado</h2>
        <div className="flex items-center gap-4 flex-wrap">
           <Button disabled>Disabled Default</Button>
           <Button variant="outline" disabled>Disabled Outline</Button>
        </div>

    </main>
  );
}