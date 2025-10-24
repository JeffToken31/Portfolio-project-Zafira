import { ManualStatistic } from '../domain/manualStats.entity';
import { ManualStatisticEntry } from '../domain/manualStatsEntry.entity';
import { ManualStatisticType as DomainManualStatisticType } from '../domain/manualStatsType.enum';
import { ManualStatisticType as PrismaManualStatisticType } from '@prisma/client';

// Typage strict Prisma pour findMany/findFirst
export type RawManualStatisticData = {
  id: string;
  type: PrismaManualStatisticType;
  entries: {
    id: string;
    manualStatisticId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export class ManualStatsMapper {
  // --------------------- Helpers ---------------------
  private static mapTypeToPrisma(
    type: DomainManualStatisticType,
  ): PrismaManualStatisticType {
    switch (type) {
      case DomainManualStatisticType.BENEFICIARIES:
        return PrismaManualStatisticType.BENEFICIARIES;
      case DomainManualStatisticType.CLOTHES_KG:
        return PrismaManualStatisticType.CLOTHES_KG;
      case DomainManualStatisticType.WORKSHOPS:
        return PrismaManualStatisticType.WORKSHOPS;
      default:
        throw new Error(`Invalid ManualStatisticType: ${type as string}`);
    }
  }

  private static mapTypeToDomain(
    type: PrismaManualStatisticType,
  ): DomainManualStatisticType {
    switch (type) {
      case PrismaManualStatisticType.BENEFICIARIES:
        return DomainManualStatisticType.BENEFICIARIES;
      case PrismaManualStatisticType.CLOTHES_KG:
        return DomainManualStatisticType.CLOTHES_KG;
      case PrismaManualStatisticType.WORKSHOPS:
        return DomainManualStatisticType.WORKSHOPS;
      default:
        throw new Error(
          `Invalid Prisma ManualStatisticType: ${type as string}`,
        );
    }
  }

  // --------------------- Prisma -> Domaine ---------------------
  static toDomain(raw: RawManualStatisticData): ManualStatistic {
    const entries = raw.entries.map(
      (e) =>
        new ManualStatisticEntry(
          e.id,
          e.manualStatisticId,
          e.quantity,
          e.createdAt,
          e.updatedAt,
        ),
    );

    return new ManualStatistic(raw.id, this.mapTypeToDomain(raw.type), entries);
  }

  // --------------------- Entry -> Prisma ---------------------
  static toEntryPersistence(entry: ManualStatisticEntry) {
    return {
      id: entry.id,
      quantity: entry.quantity,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      manualStatistic: { connect: { id: entry.manualStatisticId } },
    };
  }
}
