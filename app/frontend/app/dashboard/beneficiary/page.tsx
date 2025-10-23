'use client';

import React, {useEffect, useState} from 'react';
import {
  Bell,
  LogOut,
  Edit,
  Heart,
  Mail,
  CalendarCheck,
  Pen,
} from 'lucide-react';
import Link from 'next/link';
import {getTestimonials, TestimonialDto} from '@/lib/api/testimonials';

export default function BeneficiaireDashboard() {
  const [temoignages, setTemoignages] = useState<TestimonialDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exemple de données utilisateur
  const user = {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'user@example.com',
    createdAt: '01/01/2023',
  };

  useEffect(() => {
    async function fetchTemoignages() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTestimonials(); // récupère tous les témoignages de ce user
        setTemoignages(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }
    fetchTemoignages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">
          Mon espace personnel
        </h1>
        <div className="flex gap-4">
          <button className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-200 transition">
            <Bell className="w-6 h-6 text-[var(--color-primary)]" />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-200 transition">
            <LogOut className="w-6 h-6 text-[var(--color-primary)]" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6 col-span-1">
          {/* Mon profil */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Mon profil</h2>
              <Link href="/dashboard/beneficiary/edit">
                <button className="p-2 rounded hover:bg-gray-100 transition">
                  <Edit className="w-5 h-5 text-[var(--color-primary)]" />
                </button>
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[var(--color-primary)]" />
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Depuis le {user.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Partager mon expérience */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Partager mon expérience</h2>
            <div className="text-gray-600">
              Votre témoignage aide les autres personnes et soutient notre
              mission.
            </div>
            <Link href="/dashboard/beneficiary/testimonial">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full flex justify-center items-center gap-2">
                <Pen className="w-5 h-5" /> Écrire un témoignage
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 col-span-2">
          {/* Mes activités */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Mes activités</h2>
            <div className="text-gray-600">Aucune activité pour le moment.</div>
          </div>

          {/* Mes témoignages */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Mes témoignages</h2>

            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && temoignages.length === 0 && (
              <p className="text-gray-500 text-sm">
                Vous n’avez pas encore partagé de témoignages.
              </p>
            )}

            <div className="space-y-4">
              {temoignages.map((t) => (
                <div
                  key={t.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <p className="text-gray-800">{t.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Statut :{' '}
                    {t.validated
                      ? '✅ Validé'
                      : '⏳ En attente de validation par un administrateur'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Envoyé le{' '}
                    {new Date(t.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
