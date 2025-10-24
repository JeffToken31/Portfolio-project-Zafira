'use client';

import React, {useEffect, useState} from 'react';
import AdminPartnerForm from '@/components/forms/AdminPartnerForm';
import {getPartners, deletePartner, PartnerDto} from '@/lib/api/partners';
import AdminPartnerEditModal from '@/components/dashboard/AdminPartnerEditModal';
import {Button} from '@/components/uiStyled/button';
import Image from 'next/image';
import NavDashboard from '@/components/uiStyled/nav-dashboard';
import toast from 'react-hot-toast';

export default function AdminPartnerDashboardPage() {
  // --- State management ---
  const [partners, setPartners] = useState<PartnerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<PartnerDto | null>(
    null
  );

  // Modal state for delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<PartnerDto | null>(null);

  // --- Fetch partners whenever refreshFlag changes ---
  useEffect(() => {
    let active = true;

    async function fetchPartners() {
      setLoading(true);
      setError(null);
      try {
        const data = await getPartners();
        if (active) setPartners(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchPartners();
    return () => {
      active = false;
    };
  }, [refreshFlag]);

  // Trigger refresh manually
  const refresh = () => setRefreshFlag((x) => x + 1);

  // --- Handle edit modal ---
  const handleEdit = (partner: PartnerDto) => {
    setSelectedPartner(partner);
    setIsEditOpen(true);
  };

  // --- Handle partner deletion ---
const handleDelete = async () => {
  if (!deleteTarget) return;

  const id = deleteTarget.id;
  setDeleteTarget(null); // close modal immediately

  try {
    await deletePartner(id);
    refresh(); // refetch list
    toast.success('Partenaire supprimé');
  } catch (err: unknown) {
    toast.error(
      err instanceof Error ? err.message : 'Erreur lors de la suppression'
    );
  }
};


  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">
          Gestion des partenaires
        </h1>

        <NavDashboard />

        {/* --- Create new partner section --- */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Ajouter un partenaire</h2>
          <AdminPartnerForm onCreated={refresh} />
        </section>

        {/* --- List existing partners section --- */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Partenaires existants</h2>

          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && partners.length === 0 && (
            <p>Aucun partenaire pour le moment.</p>
          )}

          <div className="space-y-4">
            {partners.map((p) => (
              <div
                key={p.id} // Ensure key is unique and stable
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex gap-4 items-center">
                  {p.logoUrl ? (
                    <Image
                      src={p.logoUrl}
                      alt={p.companyName}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-md text-gray-400 text-sm">
                      Pas de logo
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{p.companyName}</h3>
                    {p.name && <p className="text-gray-600">{p.name}</p>}
                    {p.email && (
                      <p className="text-gray-600 text-sm">{p.email}</p>
                    )}
                    {p.phoneNumber && (
                      <p className="text-gray-600 text-sm">{p.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="bleu"
                    size="sm"
                    onClick={() => handleEdit(p)}
                  >
                    Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="rose"
                    size="sm"
                    onClick={() => setDeleteTarget(p)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- Edit partner modal --- */}
      <AdminPartnerEditModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        partner={selectedPartner}
        onUpdated={() => {
          setIsEditOpen(false);
          refresh();
        }}
      />

      {/* --- Delete confirmation modal --- */}
      {deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <p>
              Êtes-vous sûr de vouloir supprimer{' '}
              <strong>{deleteTarget.companyName}</strong> ?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="rose" onClick={handleDelete}>
                Oui, supprimer
              </Button>
              <Button variant="default" onClick={() => setDeleteTarget(null)}>
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
