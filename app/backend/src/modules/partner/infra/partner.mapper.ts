import { Partner } from '../domain/partner.entity';

type PrismaPartner = {
  id: string;
  companyName: string;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export class PartnerMapper {
  static toDomain(raw: PrismaPartner): Partner {
  return new Partner({
    id: raw.id,
    companyName: raw.companyName,
    name: raw.name ?? undefined,
    email: raw.email ?? undefined,
    phoneNumber: raw.phoneNumber ?? undefined,
    logoUrl: raw.logoUrl ?? null,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
  });
}

  static toPrismaCreate(partner: Partner) {
    return {
      companyName: partner.companyName,
      name: partner.name ?? undefined,
      email: partner.email ?? undefined,
      phoneNumber: partner.phoneNumber ?? undefined,
      logoUrl: partner.logoUrl,
      createdAt: partner.createdAt,
      updatedAt: partner.updatedAt,
    };
  }

  static toPrismaUpdate(partner: Partner) {
    return {
      companyName: partner.companyName,
      name: partner.name,
      email: partner.email,
      phoneNumber: partner.phoneNumber,
      logoUrl: partner.logoUrl,
      updatedAt: new Date(),
    };
  }
}
