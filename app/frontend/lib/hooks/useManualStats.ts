'use client';

import {useState, useEffect, useCallback} from 'react';
import {
  getManualStats,
  addManualStatEntry,
  updateManualStatEntry,
  deleteManualStatEntry,
  type ManualStatisticDto,
  type CreateManualStatisticEntryDto,
  type UpdateManualStatisticEntryDto,
} from '@/lib/api/manualStats';

export function useManualStats() {
  const [stats, setStats] = useState<ManualStatisticDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  // Function to refresh
  const refresh = useCallback(() => setRefreshFlag((x) => x + 1), []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await getManualStats();
        if (active) setStats(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [refreshFlag]);

  // Add entry
  const addEntry = useCallback(
    async (statId: string, dto: CreateManualStatisticEntryDto) => {
      try {
        await addManualStatEntry(statId, dto);
        refresh(); // recharge après ajout
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      }
    },
    [refresh]
  );

  // Update
  const updateEntry = useCallback(
    async (
      statId: string,
      entryId: string,
      dto: UpdateManualStatisticEntryDto
    ) => {
      try {
        await updateManualStatEntry(statId, entryId, dto);
        refresh();
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      }
    },
    [refresh]
  );

  // Delete
  const deleteEntry = useCallback(
    async (statId: string, entryId: string) => {
      try {
        await deleteManualStatEntry(statId, entryId);
        refresh();
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      }
    },
    [refresh]
  );

  return {
    stats,
    loading,
    error,
    refresh,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
