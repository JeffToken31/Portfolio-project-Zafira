import { ManualStatisticEntry } from '../../domain/manualStatsEntry.entity';
import { CreateManualStatisticEntryDto } from './create-entry.dto';
import crypto from 'crypto';

export class ManualStatsDtoMapper {
  static toEntryDomain(
    statId: string,
    dto: CreateManualStatisticEntryDto,
  ): ManualStatisticEntry {
    return new ManualStatisticEntry(crypto.randomUUID(), statId, dto.quantity);
  }
}
