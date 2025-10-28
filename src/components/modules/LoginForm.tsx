// src/components/modules/PublicHeader.tsx
'use client';

import React, { useState } from 'react'; // Ya estaba importado
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import logoDark from '/public/logoDarkArk-hrz.png';
import logoLight from '/public/logoClaroArk-hrz.png';
// Importar icono de menú si se usa
// import { Menu } from 'lucide-react';

export default function PublicHeader() {
  const t = useTranslations('common.navbar');
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  // Añadir estado para menú móvil (si se implementa)
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      // ... (código existente es correcto para .tsx)
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Logo Link */}
        <Link href="/" className="flex items-center">
          <Image src={logoDark} /* ... */ className="dark:hidden" />
          <Image src={logoLight} /* ... */ className="hidden dark:block" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          {/* ... (código existente es correcto) */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            // onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Lógica para abrir/cerrar menú móvil
          >
             {/* <Menu className="h-6 w-6" /> */}
             <svg // Placeholder Icono Menú
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
             >
               <line x1="4" x2="20" y1="12" y2="12" />
               <line x1="4" x2="20" y1="6" y2="6" />
               <line x1="4" x2="20" y1="18" y2="18" />
             </svg>
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>
      </div>
       {/* Aquí iría el menú desplegable móvil si se implementa */}
       {/* {mobileMenuOpen && ( <MobileNav /> )} */}
    </motion.header>
  );
}