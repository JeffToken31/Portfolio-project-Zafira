'use client';

import React, {useEffect, useState} from 'react';
import AdminActionForm from '@/components/forms/AdminActionForm';
import AdminActionEditModal from '@/components/dashboard/adminActionEditModal';
import {
  getActions,
  patchAction,
  deleteAction,
  ActionDto,
} from '@/lib/api/actions';
import { Button } from '@/components/uiStyled/button';
import Image from 'next/image';
import NavDashboard from '@/components/uiStyled/nav-dashboard';



export default function AdminActionDashboardPage() {
  const [actions, setActions] = useState<ActionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionDto | null>(null);

  // fetch actions
  useEffect(() => {
    let active = true;
    async function fetchActions() {
      setLoading(true);
      setError(null);
      try {
        const data = await getActions();
        if (active) setActions(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchActions();
    return () => {
      active = false;
    };
  }, [refreshFlag]);

  const refresh = () => setRefreshFlag((x) => x + 1);

  const handleTogglePublish = async (a: ActionDto) => {
    try {
      await patchAction(a.id, {published: !a.published});
      refresh();
    } catch (err: unknown) {
      alert(
        err instanceof Error
          ? err.message
          : 'Erreur lors du changement de statut'
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette action ?')) return;
    try {
      await deleteAction(id);
      refresh();
    } catch (err: unknown) {
      alert(
        err instanceof Error ? err.message : 'Erreur lors de la suppression'
      );
    }
  };

  const handleEdit = (action: ActionDto) => {
    setSelectedAction(action);
    setIsEditOpen(true);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">
          Gestion des prestations proposées
        </h1>
        <NavDashboard />
        {/* Create section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Créer une nouvelle action</h2>
          <AdminActionForm onCreated={refresh} />
        </section>

        {/* list object section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Actions existantes</h2>

          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && actions.length === 0 && (
            <p>Aucune action pour le moment.</p>
          )}

          <div className="space-y-4">
            {actions.map((a) => (
              <div
                key={a.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex gap-4 items-start">
                  {a.imageUrl ? (
                    <Image
                      src={a.imageUrl}
                      alt={a.title}
                      width={200}
                      height={200}
                      unoptimized
                      className="w-28 h-28 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-md text-gray-400 text-sm">
                      Pas d’image
                    </div>
                  )}
                  <div className="max-w-lg">
                    <h3 className="font-semibold text-gray-900">{a.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {a.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {a.published ? 'Publié' : 'Brouillon'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="jaune"
                    size="sm"
                    onClick={() => handleTogglePublish(a)}
                  >
                    {a.published ? 'Dépublier' : 'Publier'}
                  </Button>

                  <Button
                    type="button"
                    variant="bleu"
                    size="sm"
                    onClick={() => handleEdit(a)}
                  >
                    Modifier
                  </Button>

                  <Button
                    type="button"
                    variant="rose"
                    size="sm"
                    onClick={() => handleDelete(a.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* update modal */}
      <AdminActionEditModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        action={selectedAction}
        onUpdated={() => {
          setIsEditOpen(false);
          refresh();
        }}
      />
    </main>
  );
}
