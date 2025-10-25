'use client';

import React, { useState, useEffect } from 'react';
import AdminCard from './admin-card';
import AdminActivityCard from './admin-activity-card';
import NavDashboard from '@/components/uiStyled/nav-dashboard';
import { Eye, TrendingUp, Users, MessageSquare, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const now = new Date();

    const fakeActivities = [
      {
        id: 1,
        icon: <Users />,
        type: 'Bénéficiaire',
        firstName: 'Alice',
        lastName: 'Dupont',
        time: new Date(now.getTime() - 2 * 60 * 60 * 1000), // il y a 2h
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
    <div className="space-y-12">
      <NavDashboard />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard icon={<Eye />} label="Visiteurs aujourd'hui" value="6" />
        <AdminCard icon={<TrendingUp />} label="Total visiteurs" value="45" />
        <AdminCard icon={<Users />} label="Bénéficiaires inscrits" value="9" />
      </div>

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
