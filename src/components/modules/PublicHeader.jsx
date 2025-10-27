// src/components/modules/PublicHeader.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importar Next Image
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/Button'; // Asegúrate que la ruta sea correcta

// Importar los logos
import logoDark from '/public/logoDarkArk-hrz.png'; // Asumiendo logo horizontal oscuro por defecto 
import logoLight from '/public/logoClaroArk-hrz.png'; // Asumiendo logo horizontal claro para modo oscuro 

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
      // Animar la opacidad y posición al cargar (opcional)
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Link del Logo */}
        <Link href="/" className="flex items-center">
          {/* Imagen Oscura (por defecto) */}
          <Image
            src={logoDark}
            alt="Arknica Logo"
            width={150} // Ajusta el ancho según necesites
            height={40} // Ajusta la altura proporcionalmente
            priority // Priorizar carga del logo (importante para LCP)
            className="dark:hidden" // Ocultar en modo oscuro
          />
          {/* Imagen Clara (visible en modo oscuro) */}
          <Image
            src={logoLight}
            alt="Arknica Logo"
            width={150} // Mismo ancho
            height={40} // Misma altura
            priority
            className="hidden dark:block" // Ocultar en modo claro, mostrar en oscuro
          />
        </Link>

        {/* Navegación */}
        <nav className="hidden md:block"> {/* Ocultar en móviles pequeños */}
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
            <span className="sr-only">Abrir menú</span> {/* Accesibilidad */}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}