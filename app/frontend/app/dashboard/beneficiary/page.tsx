'use client';

import React, {useEffect, useState} from 'react';
import {
  LogOut,
  Edit,
  Heart,
  Mail,
  CalendarCheck,
  Pen,
} from 'lucide-react';
import Link from 'next/link';
import {getTestimonials, TestimonialDto} from '@/lib/api/testimonials';
import {getUserById, UserDto} from '@/lib/api/user';
import {fetchUser, logout} from '@/lib/api/auth';

export default function BeneficiaireDashboard() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [temoignages, setTemoignages] = useState<TestimonialDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 300));
        const response = await fetchUser();
        const me = response?.user ?? null;
        if (!me?.id) {
          throw new Error("Impossible de récupérer l'utilisateur connecté");
        }
        const userData = await getUserById(me.id);
        setUser(userData);

        const temoignagesData = await getTestimonials();
        setTemoignages(temoignagesData);
      } catch (err: unknown) {
        console.error('❌ Erreur fetchData:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('userId');
      window.location.href = '/login';
    } catch {
      alert('Erreur lors de la déconnexion');
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center">Chargement du tableau de bord...</div>
    );
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-text">
          Mon espace personnel
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-200 transition"
          >
            <LogOut className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6 col-span-1">
          {/* Profil */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Mon profil</h2>
              <Link href="/dashboard/beneficiary/edit">
                <button className="p-2 rounded hover:bg-gray-100 transition">
                  <Edit className="w-5 h-5 text-[var(--color-primary)]" />
                </button>
              </Link>
            </div>

            {user ? (
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

                {/* Affiche la date uniquement si elle existe */}
                {user.createdAt && (
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-[var(--color-primary)]" />
                    <span>
                      Depuis le{' '}
                      {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">
                Impossible de charger votre profil.
              </p>
            )}
          </div>

          {/* Témoignage */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Partager mon expérience</h2>
            <p className="text-gray-600">
              Votre témoignage aide les autres personnes et soutient notre
              mission.
            </p>
            <Link href="/dashboard/beneficiary/testimonial">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full flex justify-center items-center gap-2">
                <Pen className="w-5 h-5" /> Écrire un témoignage
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 col-span-2">
          {/* Activités */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Mes activités</h2>
            <div className="text-gray-600">Aucune activité pour le moment.</div>
          </div>

          {/* Témoignages */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Mes témoignages</h2>
            {temoignages.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Vous n’avez pas encore partagé de témoignages.
              </p>
            ) : (
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
