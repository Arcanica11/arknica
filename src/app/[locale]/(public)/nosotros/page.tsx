// src/app/[locale]/(public)/nosotros/page.tsx
'use client';

import React from 'react'; // <--- CORRECCIÓN: Añadir importación
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function NosotrosPage() {
  const t = useTranslations('common.navbar'); 

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
       <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-h1 font-display mb-4">{t('about')}</h1>
        <p className="text-lg text-muted-foreground mt-8 max-w-3xl mx-auto">
          {/* Placeholder: Añade texto sobre la visión, misión, equipo de Arknica.
              Crea las claves correspondientes en tus archivos messages/xx.json
              (ej. common.about.vision, common.about.mission, etc.)
          */}
          Contenido sobre Arknica Tec irá aquí. Definiremos la visión, misión y presentaremos al equipo.
          (Este texto es un placeholder, reemplázalo con las traducciones reales).
        </p>
      </motion.div>
    </div>
  );
}