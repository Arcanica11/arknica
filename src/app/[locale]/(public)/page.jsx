// src/app/[locale]/(public)/page.jsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LandingPage() {
  const t = useTranslations('common.hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    // Section 1: Hero
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-24 overflow-hidden">
      {/* Background Visual Placeholder */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6"
      >
        <motion.h1 variants={itemVariants} className="font-display text-h1 max-w-4xl">
          {t('title')}
        </motion.h1>

        <motion.p variants={itemVariants} className="text-p text-muted-foreground max-w-2xl">
          {t('subtitle')}
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link href="/contacto" passHref>
            <Button size="lg" className="mt-4">
              {t('button')}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>

    // Future sections (Services, Social Proof) will be added here in the next prompts.
  );
}