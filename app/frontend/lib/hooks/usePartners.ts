'use client';

import { useEffect, useState } from 'react';

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  published: boolean;
}

export function usePartners(limit?: number) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      setLoading(true);
      try {
        const res = await fetch(`/api/partners${limit ? `?limit=${limit}` : ''}`);
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setPartners(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, [limit]);

  return { partners, loading, error };
}
