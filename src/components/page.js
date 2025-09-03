// src/app/page.jsx
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 gap-4">
      <h1 className="text-2xl font-bold mb-4">Prueba de Componente: Button</h1>
      
      {/* --- Variantes de Estilo --- */}
      <div className="flex items-center gap-4">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      {/* --- Variantes de Tamaño --- */}
      <div className="flex items-center gap-4">
        <Button size="lg">Large Size</Button>
        <Button size="default">Default Size</Button>
        <Button size="sm">Small Size</Button>
      </div>
      
      {/* --- Prueba con Ícono --- */}
      <div className="flex items-center gap-4">
        <Button>
          <Mail className="mr-2 h-4 w-4" /> Login with Email
        </Button>
        <Button variant="outline" size="icon">
          <Mail className="h-4 w-4" />
        </Button>
      </div>

    </main>
  );
}