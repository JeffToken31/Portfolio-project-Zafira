import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IManualStatisticRepository } from '../domain/ImanualStats.repository';
import { ManualStatistic } from '../domain/manualStats.entity';
import { ManualStatisticEntry } from '../domain/manualStatsEntry.entity';
import { ManualStatisticType } from '../domain/manualStatsType.enum';
import { CreateManualStatisticEntryDto } from '../interface/dto/create-entry.dto';
import { UpdateManualStatisticEntryDto } from '../interface/dto/update-entry.dto';
import { ManualStatsDtoMapper } from '../interface/dto/manualStats-dto.mapper';

@Injectable()
export class ManualStatsService {
  constructor(
    @Inject('IManualStatisticRepository')
    private readonly manualStatsRepo: IManualStatisticRepository,
  ) {}

  async getAll(): Promise<ManualStatistic[]> {
    return this.manualStatsRepo.findAll();
  }

  async getById(id: string): Promise<ManualStatistic> {
    const stat = await this.manualStatsRepo.findById(id);
    if (!stat) throw new NotFoundException(`ManualStatistic ${id} not found`);
    return stat;
  }

  async getByType(typeStr: string): Promise<ManualStatistic> {
    const type = typeStr as ManualStatisticType;
    const stat = await this.manualStatsRepo.findByType(type);
    if (!stat)
      throw new NotFoundException(`ManualStatistic type ${type} not found`);
    return stat;
  }

  async addEntry(
    statId: string,
    dto: CreateManualStatisticEntryDto,
  ): Promise<ManualStatisticEntry> {
    const stat = await this.manualStatsRepo.findById(statId);
    if (!stat)
      throw new NotFoundException(`ManualStatistic ${statId} not found`);

    const entry = ManualStatsDtoMapper.toEntryDomain(statId, dto);

    return this.manualStatsRepo.addEntry(statId, entry);
  }

  async updateEntry(
    entryId: string,
    dto: UpdateManualStatisticEntryDto,
  ): Promise<ManualStatisticEntry> {
    if (dto.quantity === undefined) {
      throw new Error('Quantity is required for update.');
    }

    return this.manualStatsRepo.updateEntryQuantity(entryId, dto.quantity);
  }

  async deleteEntry(entryId: string): Promise<void> {
    const entry = await this.manualStatsRepo.findEntryById(entryId);
    if (!entry) throw new NotFoundException(`Entry ${entryId} not found`);

    return this.manualStatsRepo.deleteEntry(entryId);
  }
}
