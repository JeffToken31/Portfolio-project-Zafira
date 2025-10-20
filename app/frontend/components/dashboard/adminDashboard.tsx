'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import AdminCard from './admin-card';
import AdminActivityCard from './admin-activity-card';
import AdminBlogForm from '@/components/forms/AdminBlogForm';
import {Eye, TrendingUp, Users, MessageSquare, FileText} from 'lucide-react';

export default function AdminDashboard() {
  const [activities, setActivities] = useState<any[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const fakeActivities = [
      {
        id: 1,
        icon: <Users />,
        type: 'Bénéficiaire',
        firstName: 'Alice',
        lastName: 'Dupont',
        time: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },
      {
        id: 2,
        icon: <MessageSquare />,
        type: 'Témoignage',
        firstName: 'Jean',
        lastName: 'Martin',
        time: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      },
      {
        id: 3,
        icon: <FileText />,
        type: 'Blog',
        title: "L'impact de notre association",
        time: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
    ];
    setActivities(fakeActivities);
  }, []);

  const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-8">
      {/* Navigation rapide */}
      <nav className="flex justify-between w-full text-[var(--color-primary)] font-semibold">
        {[
          {name: 'Analytics', href: '/dashboard/analytics'},
          {name: 'Bénéficiaires', href: '/dashboard/beneficiaires'},
          {name: 'Témoignages', href: '/dashboard/temoignages'},
          {name: 'Contenu', href: '/dashboard/contenu'},
          {name: 'Activités', href: '/dashboard/activites'},
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="hover:text-pink-500 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-pink-500 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard icon={<Eye />} label="Visiteurs aujourd'hui" value="123" />
        <AdminCard icon={<TrendingUp />} label="Total visiteurs" value="4567" />
        <AdminCard icon={<Users />} label="Bénéficiaires inscrits" value="89" />
      </div>

      {/* Formulaire création blog */}
      <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Créer un nouveau blog
        </h2>
        <AdminBlogForm onPreviewChange={setPreview} />

        {/* Preview image/vidéo */}
        {preview && (
          <div className="mt-4">
            {preview.endsWith('.mp4') ? (
              <video src={preview} controls className="max-w-full rounded" />
            ) : (
              <img src={preview} alt="Preview" className="max-w-full rounded" />
            )}
          </div>
        )}
      </div>

      {/* Activités récentes */}
      <div>
        <h2 className="text-xl font-bold mb-4">Activités récentes</h2>
        <div className="space-y-3">
          {activities.map((activity) => (
            <AdminActivityCard
              key={activity.id}
              icon={activity.icon}
              description={
                activity.type === 'Bénéficiaire'
                  ? `Nouveau bénéficiaire inscrit : ${activity.firstName} ${activity.lastName[0]}.`
                  : activity.type === 'Témoignage'
                  ? `Nouveau témoignage soumis par : ${activity.firstName} ${activity.lastName[0]}.`
                  : `Article de blog publié : "${activity.title}"`
              }
              timeAgo={getTimeAgo(activity.time)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
