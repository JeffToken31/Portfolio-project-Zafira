import { ManualStatistic } from '../../domain/manualStats.entity';
import { ManualStatisticEntry } from '../../domain/manualStatsEntry.entity';
import { CreateManualStatisticDto } from './create-entry.dto';
import crypto from 'crypto';

export class ManualStatsDtoMapper {
  static toDomainFromCreate(dto: CreateManualStatisticDto): ManualStatistic {
    const entries = dto.entries.map(
      (e) =>
        new ManualStatisticEntry(
          crypto.randomUUID(),
          crypto.randomUUID(), // temporaire, on connectera au ManualStatistic plus tard
          e.quantity,
        ),
    );

    return new ManualStatistic(
      crypto.randomUUID(),
      dto.type,
      entries, // total calculé automatiquement
    );
  }
}
