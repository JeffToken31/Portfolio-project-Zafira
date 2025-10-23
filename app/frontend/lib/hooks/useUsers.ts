'use client';

import { useEffect, useState } from 'react';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  active?: boolean;
  createdAt?: string;
}

export function useUsers(limit?: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(`/api/users${limit ? `?limit=${limit}` : ''}`);
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [limit]);

  return { users, loading, error };
}
