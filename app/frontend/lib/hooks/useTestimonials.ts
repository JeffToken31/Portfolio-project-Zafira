'use client';

import { useEffect, useState } from 'react';

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  published: boolean;
  publishedAt?: string;
}

export function useTestimonials(limit?: number) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/testimonials${limit ? `?limit=${limit}` : ''}`
        );
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setTestimonials(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, [limit]);

  return { testimonials, loading, error };
}
