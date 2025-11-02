'use client';

import { useEffect, useState } from 'react';
import ActionSectionCard from '@/components/uiStyled/action-section-card';
import { getActions, ActionDto } from '@/lib/api/actions';

export default function ActionsPage() {
  const [actions, setActions] = useState<ActionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActions() {
      try {
        const data = await getActions();
        setActions(data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les actions.');
      } finally {
        setLoading(false);
      }
    }

    fetchActions();
  }, []);

  if (loading)
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement des actions...</p>
      </main>
    );

  if (error)
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </main>
    );

  return (
    <main className="bg-bg min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Nos prestations</h1>

        {actions.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucune prestation trouvée pour le moment.
          </p>
        ) : (
          <div className="flex justify-center gap-6 flex-wrap">
            {actions.map((action) => (
              <ActionSectionCard
                key={action.id}
                title={action.title}
                description={action.description}
                image={action.imageUrl || '/images/placeholder.jpg'}
                link={`/actions/${action.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
