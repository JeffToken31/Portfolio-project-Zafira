'use client';

import React, {useEffect, useState} from 'react';
import {
  getTestimonials,
  validateTestimonial,
  unvalidateTestimonial,
  publishTestimonial,
  unpublishTestimonial,
  deleteTestimonial,
  TestimonialDto,
} from '@/lib/api/testimonials';
import {Button} from '@/components/uiStyled/button';
import NavDashboard from '@/components/uiStyled/nav-dashboard';

export default function AdminTestimonialDashboardPage() {
  const [testimonials, setTestimonials] = useState<TestimonialDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    let active = true;

    async function fetchTestimonials() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTestimonials();
        if (active) setTestimonials(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchTestimonials();
    return () => {
      active = false;
    };
  }, [refreshFlag]);

  const refresh = () => setRefreshFlag((x) => x + 1);

  const handleToggleValidation = async (t: TestimonialDto) => {
    try {
      if (t.validated) await unvalidateTestimonial(t.id);
      else await validateTestimonial(t.id);
      refresh();
    } catch (err: unknown) {
      alert(
        err instanceof Error
          ? err.message
          : 'Erreur lors du changement de validation'
      );
    }
  };

  const handleTogglePublish = async (t: TestimonialDto) => {
    try {
      if (t.published) await unpublishTestimonial(t.id);
      else await publishTestimonial(t.id);
      refresh();
    } catch (err: unknown) {
      alert(
        err instanceof Error
          ? err.message
          : 'Erreur lors du changement de statut de publication'
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    try {
      await deleteTestimonial(id);
      refresh();
    } catch (err: unknown) {
      alert(
        err instanceof Error
          ? err.message
          : 'Erreur lors de la suppression du témoignage'
      );
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Gestion des Témoignages
        </h1>

        <NavDashboard />

        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Témoignages reçus</h2>

          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && testimonials.length === 0 && (
            <p>Aucun témoignage pour le moment.</p>
          )}

          <div className="space-y-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex flex-col md:flex-row justify-between gap-4 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {t.authorName || 'Anonyme'}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                    {t.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {t.published
                      ? t.publishedAt
                        ? ` — Publié le ${new Date(
                            t.publishedAt
                          ).toLocaleDateString('fr-FR')}`
                        : ' — Publié'
                      : ''}
                  </p>
                  <p className="text-xs mt-1">
                    <span
                      className={`px-2 py-1 rounded ${
                        t.validated
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {t.validated ? 'Validé' : 'En attente'}
                    </span>
                    <span
                      className={`px-2 py-1 ml-2 rounded ${
                        t.published
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {t.published ? 'Publié' : 'Non publié'}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 justify-end md:items-start">
                  <Button
                    type="button"
                    variant="jaune"
                    size="sm"
                    onClick={() => handleToggleValidation(t)}
                  >
                    {t.validated ? 'Dévalider' : 'Valider'}
                  </Button>

                  <Button
                    type="button"
                    variant="bleu"
                    size="sm"
                    onClick={() => handleTogglePublish(t)}
                  >
                    {t.published ? 'Dépublier' : 'Publier'}
                  </Button>

                  <Button
                    type="button"
                    variant="rose"
                    size="sm"
                    onClick={() => handleDelete(t.id)}
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
