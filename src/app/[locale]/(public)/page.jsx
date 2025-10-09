// src/app/[locale]/(public)/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const t = useTranslations('common.landing');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <p className="text-lg text-gray-400">
        {t('subtitle')}
      </p>
      <div className="mt-8">
        <Link href="/dashboard" passHref legacyBehavior>
          <Button asChild>
            <a>{t('button')}</a>
          </Button>
        </Link>
      </div>
    </main>
  );
}