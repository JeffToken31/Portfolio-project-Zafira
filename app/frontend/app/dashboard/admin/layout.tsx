'use client';

import React from 'react';
import Link from 'next/link';
import {usePendingTestimonialsCount} from '@/lib/hooks/usePendingTestimonialsCount';
import {usePathname, useRouter} from 'next/navigation';
import {Settings, ArrowLeft} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
  const {count, loading} = usePendingTestimonialsCount();
  const pathname = usePathname();
  const router = useRouter();

  // Vérifie si on est sur la page d'édition
  const isEditPage = pathname === '/dashboard/admin/edit';

  // Fonction pour gérer le clic sur le bouton
  const handleSettingsClick = (e: React.MouseEvent) => {
    if (isEditPage) {
      e.preventDefault(); // empêche la navigation
      router.back(); // revient à la page précédente
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[var(--color-surface)] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Dashboard Administrateur
          </h1>
          <h2 className="text-lg font-semibold text-[var(--color-text-dark)]">
            Gestion et suivi de Zafira Solidaire
          </h2>
        </div>

        <div className="flex gap-4">
          {/* Bouton témoignages */}
          <Link
            href="/dashboard/admin/testimonial"
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg flex items-center justify-center hover:opacity-90 transition"
          >
            {loading ? 'Chargement...' : `Témoignages en attente (${count})`}
          </Link>

          {/* Bouton paramètres / retour */}
          <Link
            href={isEditPage ? '#' : '/dashboard/admin/edit'}
            onClick={handleSettingsClick}
            className="bg-[var(--color-secondary)] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition"
          >
            {isEditPage ? (
              <>
                <ArrowLeft className="w-4 h-4" />
                Retour
              </>
            ) : (
              <>
                <Settings className="w-4 h-4" />
                Paramètres
              </>
            )}
          </Link>
        </div>
      </header>

      <main className="p-8">{children}</main>
    </div>
  );
}
