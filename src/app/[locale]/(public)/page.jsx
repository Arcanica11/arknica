// src/app/[locale]/(public)/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import ServiceCard from '@/components/modules/ServiceCard'; // Importar el nuevo componente
import { Code, Bot, Palette } from 'lucide-react'; // Importar iconos para los servicios

export default function LandingPage() {
  const tHero = useTranslations('common.hero');
  const tServices = useTranslations('common.services'); // Traducciones para la sección de servicios

  // --- Variantes de Animación (ya existentes) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre elementos hijos
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // --- Datos de Servicios ---
  // Extraemos los datos de las traducciones para mantener todo centralizado
  const services = [
    {
      title: tServices('card1.title'), // "Desarrollo Web y Apps"
      description: tServices('card1.description'), // "Creamos páginas web..."
      icon: Code, // Icono de código
    },
    {
      title: tServices('card2.title'), // "Estrategia y Consultoría"
      description: tServices('card2.description'), // "Te ayudamos a definir..."
      icon: Bot, // Icono de IA/Bot (representando estrategia/automatización)
    },
    {
      title: tServices('card3.title'), // "Diseño UX/UI"
      description: tServices('card3.description'), // "Diseñamos interfaces..."
      icon: Palette, // Icono de paleta de colores
    },
  ];

  return (
    <>
      {/* === Sección 1: Hero === */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-24 overflow-hidden">
        {/* Fondo Visual */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <motion.h1 variants={itemVariants} className="font-display text-h1 max-w-4xl">
            {tHero('title')}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-p text-muted-foreground max-w-2xl">
            {tHero('subtitle')}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/contacto" passHref>
              <Button size="lg" className="mt-4">
                {tHero('button')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* === Sección 2: Servicios === */}
      <section className="py-24 bg-background"> {/* Cambiado a bg-background o puedes usar bg-secondary/30 */}
        <div className="container mx-auto px-4">
          {/* Título de la Sección (Opcional, puede ir en ServiceCard) */}
          <motion.h2
            className="text-h2 font-display text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {tServices('hero.title')} {/* "Nuestros Servicios" */}
          </motion.h2>

          {/* Grid de Servicios */}
          {/* Usamos motion.div aquí si queremos animar el grid como un contenedor */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title} // Usar título como key (asumiendo que son únicos)
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index} // Pasar el índice para la animación escalonada
              />
            ))}
          </div>
        </div>
      </section>

      {/* === Futuras secciones (Social Proof, Cómo trabajamos, etc.) irán aquí === */}
    </>
  );
}