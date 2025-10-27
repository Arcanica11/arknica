// src/app/[locale]/(public)/servicios/page.tsx
'use client';

import React from 'react'; // <--- CORRECCIÓN: Añadir importación
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/modules/ServiceCard';
import { Code, Bot, Palette, ShoppingCart, Megaphone, BarChart } from 'lucide-react';

export default function ServiciosPage() {
  const t = useTranslations('common.services');

  const allServices = [
    { title: t('card1.title'), description: t('card1.description'), icon: Code },
    { title: t('card2.title'), description: t('card2.description'), icon: Bot },
    { title: t('card3.title'), description: t('card3.description'), icon: Palette },
    // Añade más servicios aquí si los defines en 'messages/es.json' y 'en.json'
    // { title: t('card4.title'), description: t('card4.description'), icon: ShoppingCart },
    // { title: t('card5.title'), description: t('card5.description'), icon: Megaphone },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-h1 font-display mb-4">{t('hero.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('hero.subtitle')}</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {allServices.map((service, index) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            icon={service.icon}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}