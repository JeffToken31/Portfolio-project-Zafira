'use client';

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {getActionById, ActionDto} from '@/lib/api/actions';
import Image from 'next/image';

export default function ActionDetailPage() {
  const params = useParams();
  const [action, setAction] = useState<ActionDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = params.id;

    // Type guard runtime
    if (!id || Array.isArray(id)) {
      setError('ID invalide dans l’URL');
      setLoading(false);
      return;
    }

    async function fetchAction() {
      try {
        setLoading(true);
        // TypeScript compliant avec "as string"
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
    <main className="bg-bg min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">{action.title}</h1>
        <Image
          src={action.imageUrl || '/images/placeholder.jpg'}
          alt={action.title}
          width={800}
          height={450}
          className="w-full mb-4 rounded"
        />
        <p>{action.description}</p>
      </div>
    </main>
  );
}
