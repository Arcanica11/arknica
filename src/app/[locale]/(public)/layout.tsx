// src/app/[locale]/(public)/layout.tsx
import React from 'react'; // <--- Añadido import
import PublicHeader from '@/components/modules/PublicHeader'; // Asegurar .tsx
import PublicFooter from '@/components/modules/PublicFooter'; // Asegurar .tsx

// Tipar las props (React.ReactNode es el tipo para children)
interface PublicLayoutProps {
  children: React.ReactNode;
}

// Usar React.FC (Functional Component) con el tipo de props
const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    // Usar flex para asegurar que el footer se quede abajo si el contenido es corto
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      {/* flex-grow permite que main ocupe el espacio restante */}
      <main className="flex-grow">{children}</main>
      <PublicFooter />
    </div>
  );
}

export default PublicLayout; // Exportar por defecto