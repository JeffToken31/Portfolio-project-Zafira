'use client';

import Link from 'next/link';
import { Bell, LogOut, Edit, MessageSquareHeart, CalendarCheck, Activity } from 'lucide-react';

export default function BeneficiaireDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Header ===== */}
      <header className="flex justify-between items-center bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold text-[var(--color-primary)]">Mon espace personnel</h1>
        <div className="flex gap-4 items-center">
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <Bell className="w-6 h-6 text-[var(--color-primary)]" />
            {/* Badge notification */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Déconnexion */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <LogOut className="w-6 h-6 text-[var(--color-primary)]" />
          </button>
        </div>
      </header>

      {/* ===== Contenu Dashboard ===== */}
      <section className="max-w-4xl mx-auto mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-6">
        {/* Mon profil */}
        <Link
          href="/dashboard/beneficiaire/profile"
          className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <CalendarCheck size={36} className="text-[var(--color-primary)] mb-2" />
          <span className="font-medium">Mon profil</span>
        </Link>

        {/* Mes activités */}
        <Link
          href="/dashboard/beneficiaire/activities"
          className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <Activity size={36} className="text-[var(--color-primary)] mb-2" />
          <span className="font-medium">Mes activités</span>
        </Link>

        {/* Partager mon expérience */}
        <Link
          href="/dashboard/beneficiaire/temoignage"
          className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <MessageSquareHeart size={36} className="text-[var(--color-primary)] mb-2" />
          <span className="font-medium">Partager mon expérience</span>
        </Link>

        {/* Mes témoignages */}
        <Link
          href="/dashboard/beneficiaire/testimonials"
          className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <Edit size={36} className="text-[var(--color-primary)] mb-2" />
          <span className="font-medium">Mes témoignages</span>
        </Link>
      </section>
    </div>
  );
}
