// src/components/modules/PublicHeader.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importar Next Image
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/Button'; // Asegúrate que la ruta sea correcta

// --- CORRECCIÓN ---
// NO importes imágenes de /public. Se referencian directamente por su ruta.
// import logoDark from '/public/logoDarkArk-hrz.png'; (ELIMINADO)
// import logoLight from '/public/logoClaroArk-hrz.png'; (ELIMINADO)

export default function PublicHeader() {
  const t = useTranslations('common.navbar');
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Link del Logo */}
        <Link href="/" className="flex items-center">
          {/* Imagen Oscura (por defecto) */}
          <Image
            // --- CORRECCIÓN ---
            src="/logoDarkArk-hrz.png" // Ruta como string desde la raíz
            alt="Arknica Logo"
            width={150} 
            height={40} 
            priority 
            className="dark:hidden" 
          />
          {/* Imagen Clara (visible en modo oscuro) */}
          <Image
            // --- CORRECCIÓN ---
            src="/logoClaroArk-hrz.png" // Ruta como string desde la raíz
            alt="Arknica Logo"
            width={150} 
            height={40} 
            priority
            className="hidden dark:block" 
          />
        </Link>

        {/* Navegación */}
        <nav className="hidden md:block"> 
          <ul className="flex items-center gap-6 text-sm font-medium text-foreground/80">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
            </li>
            <li>
              <Link href="/servicios" className="hover:text-primary transition-colors">{t('services')}</Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-primary transition-colors">{t('about')}</Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-primary transition-colors">{t('contactUs')}</Link>
            </li>
            <li>
              <Link href="/login" passHref>
                <Button variant="outline" size="sm">
                  {t('login')}
                </Button>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botón para menú móvil (placeholder) */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            {/* Aquí iría un icono de menú, ej. <Menu className="h-6 w-6" /> */}
            <span className="sr-only">Abrir menú</span> 
          </Button>
        </div>
      </div>
    </motion.header>
  );
}