'use client';

import React from 'react';
import Link from 'next/link';
import {Settings} from 'lucide-react';
import {usePendingTestimonialsCount} from '@/lib/hooks/usePendingTestimonialsCount';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
  const {count, loading} = usePendingTestimonialsCount();

  return (
    <div className="min-h-screen bg-[var(--color-bg-alt)]">
      {/* Header */}
      <header className="bg-[var(--color-surface)] shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Titre et sous-titre */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Dashboard Administrateur
          </h1>
          <h2 className="text-lg font-semibold text-[var(--color-text-dark)]">
            Gestion et suivi de Zafira Solidaire
          </h2>
        </div>

        {/* Boutons */}
        <div className="flex gap-4">
          <Link
            href="/dashboard/admin/testimonial"
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            {loading ? 'Chargement...' : `Témoignages en attente (${count})`}
          </Link>

          <Link
            href="/dashboard/settings"
            className="bg-[var(--color-secondary)] text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Paramètres
          </Link>
        </div>
      </header>

      <main className="p-8">{children}</main>
    </div>
  );
}
