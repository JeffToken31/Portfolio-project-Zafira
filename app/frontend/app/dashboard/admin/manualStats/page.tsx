'use client';

import React, {useState} from 'react';
import {useManualStats} from '@/lib/hooks/useManualStats';
import {Button} from '@/components/uiStyled/button';
import NavDashboard from '@/components/uiStyled/nav-dashboard';
import AddEntryModal from '@/components/uiStyled/manualStatModalIncrement';

export default function AdminManualStatsDashboardPage() {
  const {stats, loading, error, addEntry, deleteEntry} = useManualStats();
  const [selectedStatId, setSelectedStatId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddEntry = async (statId: string, qty: number) => {
    try {
      await addEntry(statId, {quantity: qty});
      setIsAddOpen(false);
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">
          Gestion des Statistiques Manuelles
        </h1>

        <NavDashboard />

        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Statistiques actuelles</h2>

          {stats.length === 0 && <p>Aucune statistique disponible.</p>}

          <div className="space-y-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col md:flex-row justify-between items-center border border-gray-200 rounded-lg p-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {stat.type === 'BENEFICIARIES' &&
                      '👥 Nombre de bénéficiaires accompagnés (total)'}
                    {stat.type === 'CLOTHES_KG' &&
                      '👕 Kg de vêtements collectés (total)'}
                    {stat.type === 'WORKSHOPS' &&
                      "🛠️ Nombre d'ateliers réalisés (total)"}
                  </h3>
                  <p>Total : {stat.totalQuantity}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <Button
                    variant='jaune'
                    size='sm'
                    onClick={() => {
                      setSelectedStatId(stat.id);
                      setIsAddOpen(true);
                    }}
                  >
                    Ajouter une entrée
                  </Button>

                  <AddEntryModal
                    open={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    onSubmit={(qty) => {
                      if (!selectedStatId) return;
                      handleAddEntry(selectedStatId, qty);
                    }}
                  />

                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => setSelectedStatId(stat.id)}
                  >
                    Voir les entrées
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {selectedStatId && (
          <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold">Entrées enregistrées</h2>
            <Button
              variant="default"
              size="sm"
              onClick={() => setSelectedStatId(null)}
            >
              ← Retour
            </Button>

            {stats
              .find((s) => s.id === selectedStatId)
              ?.entries?.map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <p>
                    Quantité : {entry.quantity} —{' '}
                    <span className="text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleString('fr-FR')}
                    </span>
                  </p>
                  <Button
                    variant="delete"
                    size='sm'
                    onClick={() => deleteEntry(selectedStatId, entry.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
          </section>
        )}
      </div>
    </main>
  );
}
