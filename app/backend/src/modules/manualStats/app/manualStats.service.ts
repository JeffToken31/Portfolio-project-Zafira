import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IManualStatisticRepository } from '../domain/ImanualStats.repository';
import { ManualStatistic } from '../domain/manualStats.entity';
import { CreateManualStatisticDto } from '../interface/dto/create-entry.dto';
import { UpdateManualStatisticDto } from '../interface/dto/update-entry.dto';
import { ManualStatsDtoMapper } from '../interface/dto/manualStats-dto.mapper';
import type { ManualStatisticType } from '../domain/manualStatsType.enum';

@Injectable()
export class ManualStatsService {
  constructor(
    @Inject('IManualStatisticRepository')
    private readonly manualStatsRepo: IManualStatisticRepository,
  ) {}

  // --------------------- Lecture ---------------------

  async getById(id: string): Promise<ManualStatistic> {
    const stat = await this.manualStatsRepo.findById(id);
    if (!stat) throw new NotFoundException(`ManualStatistic ${id} not found`);
    return stat;
  }

  async getByType(typeStr: string): Promise<ManualStatistic | null> {
    const type = typeStr as ManualStatisticType;
    const stat = await this.manualStatsRepo.findByType(type);
    return stat;
  }

  async getAll(): Promise<ManualStatistic[]> {
    return this.manualStatsRepo.findAll();
  }

  // --------------------- Création ---------------------

  async create(dto: CreateManualStatisticDto): Promise<ManualStatistic> {
    const stat = ManualStatsDtoMapper.toDomainFromCreate(dto);
    return this.manualStatsRepo.create(stat);
  }

  // --------------------- Mise à jour ---------------------

  async updateById(
    id: string,
    dto: UpdateManualStatisticDto,
  ): Promise<ManualStatistic> {
    const existing = await this.manualStatsRepo.findById(id);
    if (!existing)
      throw new NotFoundException(`ManualStatistic ${id} not found`);

    const updated = ManualStatsDtoMapper.toDomainFromUpdate(dto, existing);
    return this.manualStatsRepo.update(updated);
  }

  async update(stat: ManualStatistic): Promise<ManualStatistic> {
    const existing = await this.manualStatsRepo.findById(stat.id);
    if (!existing)
      throw new NotFoundException(`ManualStatistic ${stat.id} not found`);
    return this.manualStatsRepo.update(stat);
  }

  // --------------------- Suppression ---------------------

  async delete(id: string): Promise<void> {
    const existing = await this.manualStatsRepo.findById(id);
    if (!existing)
      throw new NotFoundException(`ManualStatistic ${id} not found`);
    return this.manualStatsRepo.delete(id);
  }
}
