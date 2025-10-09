'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export default function PublicHeader() {
  const t = useTranslations('common.navbar')
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link href="/" className="font-display text-2xl font-bold">
          Arkanica
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/">{t('home')}</Link>
            </li>
            <li>
              <Link href="/servicios">{t('services')}</Link>
            </li>
            <li>
              <Link href="/nosotros">{t('about')}</Link>
            </li>
            <li>
              <Link href="/contacto">{t('contactUs')}</Link>
            </li>
            <li>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  {t('login')}
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}