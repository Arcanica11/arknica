// src/components/modules/ServiceCard.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion'; // Importar 'Variants'
import { cn } from '@/lib/utils';

// Interfaz para las props
interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  index: number;
  className?: string;
}

// Variantes de animación para Framer Motion
// Asignar explícitamente el tipo 'Variants'
const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({ // Ahora TypeScript entiende que esto es válido
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  index,
  className
}) => {
  return (
    <motion.div
      variants={cardVariants} // Esto ahora es válido
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "h-full flex flex-col",
        "bg-secondary/30 dark:bg-secondary/20",
        "border border-border",
        "hover:border-primary/50",
        "transition-colors duration-300",
        "shadow-sm hover:shadow-lg",
        "p-6 md:p-8",
        "rounded-lg",
        className
      )}
    >
      {/* Contenedor del Icono y Título */}
      <div className="flex flex-col items-center text-center mb-4">
        {Icon && (
          <div className="mb-4 text-primary p-3 bg-primary/10 rounded-full inline-block">
            <Icon className="h-8 w-8 md:h-10 md:w-10" />
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">
          {title}
        </h3>
      </div>

      {/* Contenedor de la Descripción */}
      <div className="flex-grow text-center">
        <p className="text-sm md:text-base text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;