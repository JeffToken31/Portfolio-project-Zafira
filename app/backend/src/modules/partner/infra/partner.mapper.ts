import { Partner } from '../domain/partner.entity';
import { Prisma } from '@prisma/client';

export type RawPartnerData = Prisma.PartnerGetPayload<{
  select: {
    id: true;
    companyName: true;
    name: true;
    email: true;
    phoneNumber: true;
    logoUrl: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export class PartnerMapper {
  // Prisma -> Domaine
  static toDomain(raw: RawPartnerData): Partner {
    return new Partner(
      raw.id,
      raw.companyName,
      raw.logoUrl,
      raw.name ?? undefined,
      raw.email ?? undefined,
      raw.phoneNumber ?? undefined,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  // Domaine -> Prisma (création)
  static toPersistence(partner: Partner): Prisma.PartnerCreateInput {
    return {
      companyName: partner.companyName,
      name: partner.name ?? null,
      email: partner.email ?? null,
      phoneNumber: partner.phoneNumber ?? null,
      logoUrl: partner.logoUrl,
      createdAt: partner.createdAt,
      updatedAt: partner.updatedAt,
    };
  }

  // Domaine -> Prisma (mise à jour)
  static toUpdateInput(partner: Partner): Prisma.PartnerUpdateInput {
    return {
      companyName: partner.companyName,
      name: partner.name ?? null,
      email: partner.email ?? null,
      phoneNumber: partner.phoneNumber ?? null,
      logoUrl: partner.logoUrl,
      updatedAt: new Date(),
    };
  }
}
