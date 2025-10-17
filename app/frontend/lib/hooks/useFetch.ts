'use client';
import {useState} from 'react';

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (url: string, options?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error(err);
    }
  };

  return {fetchData, loading, error};
}
