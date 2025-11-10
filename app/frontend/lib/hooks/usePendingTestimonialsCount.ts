'use client';

import {useEffect, useState} from 'react';
import {getTestimonials} from '@/lib/api/testimonials';

export function usePendingTestimonialsCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchPending() {
      setLoading(true);
      try {
        // Récupère uniquement les témoignages non publiés
        const testimonials = await getTestimonials({published: false});
        if (active) setCount(testimonials.length);
      } catch {
        console.error('Erreur lors du chargement des témoignages en attente');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchPending();
    return () => {
      active = false;
    };
  }, []);

  return {count, loading};
}
