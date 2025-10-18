'use client';

import { useEffect, useState } from 'react';

export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  publishedAt?: string;
}

export function useBlogs(limit?: number) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs${limit ? `?limit=${limit}` : ''}`);
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setBlogs(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [limit]);

  return { blogs, loading, error };
}
