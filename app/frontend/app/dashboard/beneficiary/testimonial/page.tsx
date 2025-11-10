'use client';

import {useEffect, useState} from 'react';
import {
  createTestimonial,
  getMyTestimonials,
  getTestimonials,
  TestimonialDto,
} from '@/lib/api/testimonials';
import {Button} from '@/components/uiStyled/button';

export default function TemoignagePage() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [temoignages, setTemoignages] = useState<TestimonialDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch testimonial
  useEffect(() => {
    async function fetchTemoignages() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyTestimonials();
        setTemoignages(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }
    fetchTemoignages();
  }, []);

  // send testimonial
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    try {
      await createTestimonial({
        content: message,
        published: false,
        validated: false,
      });

      setStatus('Votre témoignage a bien été envoyé 🎉');
      setMessage('');

      // reload
      const data = await getTestimonials();
      setTemoignages(data);
    } catch (err: unknown) {
      setStatus(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi du témoignage"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow space-y-8">
      {/* Form */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-text">
          Partager mon témoignage
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Écrivez ici votre expérience..."
            className="w-full border rounded-lg p-2"
            required
          />

          <Button
            type="submit"
            variant="bleu"
            className="w-full"
            disabled={!message.trim()}
          >
            Envoyer
          </Button>

          {status && (
            <p className="text-center text-sm text-gray-600 mt-2">{status}</p>
          )}
        </form>
      </section>

      {/* List of testimonials */}
      <section>
        <h3 className="text-lg font-semibold mb-2">
          Mes témoignages précédents
        </h3>

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && temoignages.length === 0 && (
          <p className="text-gray-500 text-sm">
            Vous n’avez pas encore partagé de témoignage.
          </p>
        )}

        <div className="space-y-4">
          {temoignages.map((t) => (
            <div
              key={t.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <p className="text-gray-800">{t.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                Statut :{' '}
                {t.validated
                  ? '✅ Validé'
                  : '⏳ En attente de validation par un administrateur'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
