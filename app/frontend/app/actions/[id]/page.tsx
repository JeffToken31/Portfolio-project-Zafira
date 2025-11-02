'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getActionById, ActionDto } from '@/lib/api/actions';
import Image from 'next/image';
import BlogSectionButton from '@/components/uiStyled/blog-section-button';

export default function ActionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [action, setAction] = useState<ActionDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = params.id;

    // Type guard pour s'assurer que id est un string
    if (!id || Array.isArray(id)) {
      setError('ID invalide dans l’URL');
      setLoading(false);
      return;
    }

    async function fetchAction() {
      try {
        const data = await getActionById(id as string);
        setAction(data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger cette action.');
      } finally {
        setLoading(false);
      }
    }

    fetchAction();
  }, [params.id]);

  if (loading)
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </main>
    );

  if (error)
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </main>
    );

  if (!action)
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Aucune action trouvée.</p>
      </main>
    );

  return (
    <main className="bg-bg min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Conteneur pour image, avec ratio fixe pour garder la netteté */}
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] relative">
          <Image
            src={action.imageUrl || '/images/placeholder.jpg'}
            alt={action.title}
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            priority
          />
        </div>

        <div className="p-6 flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text">{action.title}</h1>
          <p className="text-gray-700 text-lg sm:text-xl">{action.description}</p>

          {/* Bouton centré */}
          <div className="flex justify-center mt-4">
            <BlogSectionButton
              onClick={() => router.push('/actions')}
              variant="secondary"
            >
              Retour aux prestations
            </BlogSectionButton>
          </div>
        </div>
      </div>
    </main>
  );
}
