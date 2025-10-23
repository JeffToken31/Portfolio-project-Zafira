'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/uiStyled/button';
import { Loader2, Mail, User, Calendar } from 'lucide-react';

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-gray-600 mb-4">
          Veuillez vous connecter pour accéder à votre profil.
        </p>
        <Button
          variant="connect"
          size="lg"
          onClick={() => (window.location.href = '/login')}
        >
          Connexion
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Mon profil utilisateur
      </h1>

      <Card className="p-6 space-y-6 shadow-md rounded-2xl bg-white">
        {/* Avatar et infos principales */}
        <div className="flex items-center gap-4">
          <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-semibold">
            {user.firstName?.[0]?.toUpperCase() ||
              user.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">
              {(user.firstName || '') + ' ' + (user.lastName || '')}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Détails utilisateur */}
        <div className="border-t pt-4 space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <span>
              <strong>Nom complet :</strong>{' '}
              {(user.firstName || '') + ' ' + (user.lastName || '')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <span>
              <strong>Email :</strong> {user.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <span>
              <strong>Créé le :</strong>{' '}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString('fr-FR')
                : '-'}
            </span>
          </div>
        </div>

        {/* Bouton d’action */}
        <div className="pt-6">
          <Button
            variant="connect"
            size="lg"
            onClick={() => alert('Fonction à venir')}
          >
            Modifier mes informations
          </Button>
        </div>
      </Card>
    </div>
  );
}
