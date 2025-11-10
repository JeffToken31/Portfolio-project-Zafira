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
  // addEntry: create entry + increment totalQuantity
  async addEntry(
    statId: string,
    entry: ManualStatisticEntry,
  ): Promise<ManualStatisticEntry> {
    // create entry
    const raw = await this.prisma.manualStatisticEntry.create({
      data: {
        id: entry.id,
        quantity: entry.quantity,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        manualStatistic: { connect: { id: statId } },
      },
    });

    // increment the parent totalQuantity
    await this.prisma.manualStatistic.update({
      where: { id: statId },
      data: { totalQuantity: { increment: raw.quantity } },
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
    // get current entry to know old quantity
    const before = await this.prisma.manualStatisticEntry.findUnique({
      where: { id: entry.id },
    });
    if (!before) throw new Error('Entry not found');

    const raw = await this.prisma.manualStatisticEntry.update({
      where: { id: entry.id },
      data: { quantity: entry.quantity, updatedAt: entry.updatedAt },
    });

    const diff = entry.quantity - before.quantity;
    if (diff !== 0) {
      await this.prisma.manualStatistic.update({
        where: { id: raw.manualStatisticId },
        data: { totalQuantity: { increment: diff } },
      });
    }

    return new ManualStatisticEntry(
      raw.id,
      raw.manualStatisticId,
      raw.quantity,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async deleteEntry(entryId: string): Promise<void> {
    // fetch entry
    const before = await this.prisma.manualStatisticEntry.findUnique({
      where: { id: entryId },
    });
    if (!before) throw new Error('Entry not found');

    await this.prisma.manualStatisticEntry.delete({ where: { id: entryId } });

    // decrement total
    await this.prisma.manualStatistic.update({
      where: { id: before.manualStatisticId },
      data: { totalQuantity: { decrement: before.quantity } },
    });
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

  // updateEntryQuantity: met à jour entry et ajuste totalQuantity en transaction
  async updateEntryQuantity(
    entryId: string,
    newQuantity: number,
  ): Promise<ManualStatisticEntry> {
    // Récupérer l'état actuel de l'entrée
    const before = await this.prisma.manualStatisticEntry.findUnique({
      where: { id: entryId },
    });
    if (!before) throw new Error('Entry not found');

    // transaction : update entry puis update totalQuantity
    const [updatedEntry] = await this.prisma.$transaction([
      this.prisma.manualStatisticEntry.update({
        where: { id: entryId },
        data: { quantity: newQuantity, updatedAt: new Date() },
      }),
      this.prisma.manualStatistic.update({
        where: { id: before.manualStatisticId },
        data: { totalQuantity: { increment: newQuantity - before.quantity } },
      }),
    ]);

    // Mapper vers instance domaine
    return new ManualStatisticEntry(
      updatedEntry.id,
      updatedEntry.manualStatisticId,
      updatedEntry.quantity,
      updatedEntry.createdAt,
      updatedEntry.updatedAt,
    );
  }
  async findEntryById(entryId: string): Promise<ManualStatisticEntry | null> {
    const raw = await this.prisma.manualStatisticEntry.findUnique({
      where: { id: entryId },
    });

    if (!raw) return null;

    return new ManualStatisticEntry(
      raw.id,
      raw.manualStatisticId,
      raw.quantity,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
