import { ManualStatistic } from './manualStats.entity';
import { ManualStatisticType } from './manualStatsType.enum';
import { ManualStatisticEntry } from './manualStatsEntry.entity';

export interface IManualStatisticRepository {
  findByType(type: ManualStatisticType): Promise<ManualStatistic | null>;
  findAll(): Promise<ManualStatistic[]>;
  // --- ManualStatisticEntry ---
  addEntry(
    statId: string,
    entry: ManualStatisticEntry,
  ): Promise<ManualStatisticEntry>;
  updateEntry(entry: ManualStatisticEntry): Promise<ManualStatisticEntry>;
  deleteEntry(entryId: string): Promise<void>;
  findEntriesByStatistic(statId: string): Promise<ManualStatisticEntry[]>;
}
