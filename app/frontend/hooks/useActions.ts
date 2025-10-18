'use client';

import { useEffect, useState } from 'react';

export interface Action {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  published: boolean;
  publishedAt?: string;
}

// ✅ Paramètre useMock pour tester en local sans backend
export function useActions(limit?: number, useMock = false) {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchActions() {
      setLoading(true);
      try {
        let data: Action[];

        if (useMock) {
          await new Promise((resolve) => setTimeout(resolve, 5000)); // 5s
          data = [
            {
              id: '1',
              title: 'Ateliers de confiance en soi',
              description:
                "Des séances pour travailler l’image de soi et reprendre confiance à travers la photo et le coaching.",
              imageUrl: '/images/action1.jpg',
              published: true,
            },
            {
              id: '2',
              title: 'Accompagnement à la réinsertion',
              description:
                'Soutien personnalisé pour retrouver un emploi et valoriser son parcours professionnel.',
              imageUrl: '/images/action2.jpg',
              published: true,
            },
            {
              id: '3',
              title: 'Partenariats solidaires',
              description:
                'Collaborations avec entreprises et institutions pour promouvoir l’inclusion sociale.',
              imageUrl: '/images/action3.jpg',
              published: true,
            },
          ].slice(0, limit ?? 3);
        } else {
          // Fetch API réel
          const res = await fetch(`/api/actions${limit ? `?limit=${limit}` : ''}`);
          if (!res.ok) throw new Error(`Erreur ${res.status}`);
          data = await res.json();
        }

        if (isMounted) setActions(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchActions();
    return () => {
      isMounted = false;
    };
  }, [limit, useMock]);

  return { actions, loading, error };
}
