import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IManualStatisticRepository } from '../domain/ImanualStats.repository';
import { ManualStatistic } from '../domain/manualStats.entity';
import { ManualStatisticEntry } from '../domain/manualStatsEntry.entity';
import { ManualStatisticType as DomainManualStatisticType } from '../domain/manualStatsType.enum';
import {
  ManualStatsMapper,
  RawManualStatisticData,
} from './manualStats.mapper';
import { ManualStatisticType as PrismaManualStatisticType } from '@prisma/client';

@Injectable()
export class ManualStatsRepository implements IManualStatisticRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaToDomain(
    raw: RawManualStatisticData | null,
  ): ManualStatistic {
    if (!raw) throw new Error('ManualStatistic not found');
    return ManualStatsMapper.toDomain(raw);
  }

  async findById(id: string): Promise<ManualStatistic | null> {
    const raw = await this.prisma.manualStatistic.findUnique({
      where: { id },
      include: { entries: true },
    });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  // --------------------- ManualStatistic ---------------------
  async findAll(): Promise<ManualStatistic[]> {
    const raws = await this.prisma.manualStatistic.findMany({
      include: { entries: true },
    });
    return raws.map((r) => this.mapPrismaToDomain(r));
  }

  async findByType(
    type: DomainManualStatisticType,
  ): Promise<ManualStatistic | null> {
    const raw = await this.prisma.manualStatistic.findFirst({
      where: { type: type as unknown as PrismaManualStatisticType },
      include: { entries: true },
    });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  // --------------------- ManualStatisticEntry ---------------------
  async addEntry(
    statId: string,
    entry: ManualStatisticEntry,
  ): Promise<ManualStatisticEntry> {
    const raw = await this.prisma.manualStatisticEntry.create({
      data: ManualStatsMapper.toEntryPersistence(entry),
    });
    return new ManualStatisticEntry(
      raw.id,
      raw.manualStatisticId,
      raw.quantity,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async updateEntry(
    entry: ManualStatisticEntry,
  ): Promise<ManualStatisticEntry> {
    const raw = await this.prisma.manualStatisticEntry.update({
      where: { id: entry.id },
      data: {
        quantity: entry.quantity,
        updatedAt: entry.updatedAt,
      },
    });
    return new ManualStatisticEntry(
      raw.id,
      raw.manualStatisticId,
      raw.quantity,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async deleteEntry(entryId: string): Promise<void> {
    await this.prisma.manualStatisticEntry.delete({ where: { id: entryId } });
  }

  async findEntriesByStatistic(
    statId: string,
  ): Promise<ManualStatisticEntry[]> {
    const raws = await this.prisma.manualStatisticEntry.findMany({
      where: { manualStatisticId: statId },
    });
    return raws.map(
      (raw) =>
        new ManualStatisticEntry(
          raw.id,
          raw.manualStatisticId,
          raw.quantity,
          raw.createdAt,
          raw.updatedAt,
        ),
    );
  }
}
