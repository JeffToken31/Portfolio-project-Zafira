'use client';

import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, UserDto } from '@/lib/api/user';
import { Button } from '@/components/uiStyled/button';
import { Badge } from '@/components/uiStyled/badge';
import toast from 'react-hot-toast';
import NavDashboard from '@/components/uiStyled/nav-dashboard';



export default function AdminUsersDashboardPage() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    let active = true;
    async function fetchUsersData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getUsers();
        if (active) setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchUsersData();
    return () => {
      active = false;
    };
  }, [refreshFlag]);

  const refresh = () => setRefreshFlag((x) => x + 1);

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    try {
      await deleteUser(id);
      toast.success('Utilisateur supprimé');
      refresh();
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Dashboard Admin — Gestion des utilisateurs
        </h1>
        <NavDashboard />
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && users.length === 0 && (
            <p>Aucun utilisateur pour le moment.</p>
          )}

          <div className="space-y-4">
            {users.map((u) => (
              <div
                key={u.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-900">{u.email}</p>
                    <p className="text-gray-600 text-sm">
                      {u.firstName || 'Prenom'} {u.lastName || 'Nom'}
                    </p>
                    <p className="mt-1">
                      {u.emailVerified ? (
                        <Badge>Vérifié ✅</Badge>
                      ) : (
                        <Badge>Non vérifié ❌</Badge>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="rose"
                    size="sm"
                    onClick={() => handleDelete(u.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
