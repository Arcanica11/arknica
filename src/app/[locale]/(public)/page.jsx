// src/app/[locale]/(public)/page.jsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a Arknica Core</h1>
      <p className="text-lg text-gray-400">
        La plantilla base se ha configurado correctamente.
      </p>
      <div className="mt-8">
        <Link href="/dashboard" passHref legacyBehavior>
          <Button asChild>
            <a>Ver el Dashboard</a>
          </Button>
        </Link>
      </div>
    </main>
  );
}