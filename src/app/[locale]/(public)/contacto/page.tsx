// src/app/[locale]/(public)/contacto/page.tsx
import React from 'react';
import { getTranslations } from 'next-intl/server'; // Usar Server Component para obtener traducciones iniciales
import ContactForm from '@/components/modules/ContactForm';
import { motion } from 'framer-motion'; // Importar motion si quieres animar elementos

// Opcional: Generar metadata específica para esta página
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'common.contactPage' }); // Namespace específico
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    // Puedes añadir OpenGraph, Twitter card específicos aquí si quieres
  };
}


export default async function ContactoPage({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'common.contactPage' });

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen"> {/* Padding y altura mínima */}
      <div className="max-w-3xl mx-auto"> {/* Centrar contenido */}

        {/* Encabezado de la página */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }} // Animar directamente
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-h2 md:text-h1 font-display mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        {/* Sección del Formulario */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }} // Añadir un pequeño delay
        >
          <ContactForm />
        </motion.div>

        {/* Opcional: Añadir otra información de contacto (email, teléfono, mapa) */}
        <div className="mt-16 text-center text-muted-foreground">
          <p>{t('alternativeContact')}</p>
          {/* <p>Email: info@arknica.com | Tel: +57 123 456 7890</p> */}
        </div>
      </div>
    </div>
  );
}