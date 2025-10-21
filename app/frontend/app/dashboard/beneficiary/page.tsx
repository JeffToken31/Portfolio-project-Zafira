// app/dashboard/beneficiaire/page.tsx
'use client';

import Link from 'next/link';
import { Edit, Trash2, MessageSquareHeart } from 'lucide-react';

export default function BeneficiaireDashboard() {
  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">
        Bienvenue sur votre espace personnel
      </h2>
      <p className="text-gray-600 mb-8">
        Depuis cet espace, vous pouvez modifier vos informations, supprimer votre compte ou partager votre expérience.
      </p>

      <div className="grid gap-6 sm:grid-cols-3">
        {/* Modifier ses infos */}
        <Link
          href="/dashboard/beneficiaire/edit"
          className="flex flex-col items-center justify-center bg-[var(--color-bg-alt)] p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <Edit size={36} className="text-[var(--color-primary)] mb-2" />
          <span className="font-medium">Modifier mes infos</span>
        </Link>

        {/* Témoignage */}
        <Link
          href="/dashboard/beneficiaire/temoignage"
          className="flex flex-col items-center justify-center bg-[var(--color-bg-alt)] p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <MessageSquareHeart size={36} className="text-[var(--color-primary)] mb-2" />
          <span className="font-medium">Partager un témoignage</span>
        </Link>

        {/* Supprimer compte */}
        <Link
          href="/dashboard/beneficiaire/delete"
          className="flex flex-col items-center justify-center bg-red-100 p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <Trash2 size={36} className="text-red-500 mb-2" />
          <span className="font-medium text-red-600">Supprimer mon compte</span>
        </Link>
      </div>
    </section>
  );
}
