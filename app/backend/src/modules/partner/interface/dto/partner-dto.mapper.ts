import { Partner } from '../../domain/partner.entity';
import { CreatePartnerDto } from './register-partner.dto';
import { UpdatePartnerDto } from './update-partner.dto';
import crypto from 'crypto';

export class PartnerDtoMapper {
  // Map CreatePartnerDto -> Domain
  static toDomainFromCreate(dto: CreatePartnerDto): Partner {
    return new Partner(
      crypto.randomUUID(),
      dto.companyName,
      dto.logoUrl,
      dto.name ?? undefined, // optionnel
      dto.email ?? undefined, // optionnel
      dto.phoneNumber ?? undefined, // optionnel
    );
  }

  // Map UpdatePartnerDto -> Domain
  static toDomainFromUpdate(dto: UpdatePartnerDto, existing: Partner): Partner {
    return new Partner(
      existing.id, // on garde l'id existant
      dto.companyName ?? existing.companyName,
      dto.logoUrl ?? existing.logoUrl,
      dto.name ?? existing.name,
      dto.email ?? existing.email,
      dto.phoneNumber ?? existing.phoneNumber,
      existing.createdAt,
      new Date(), // updatedAt à maintenant
    );
  }

  // Domain -> JSON Response (Swagger/Postman)
  static toResponse(partner: Partner): Record<string, unknown> {
    return {
      id: partner.id,
      companyName: partner.companyName,
      logoUrl: partner.logoUrl,
      name: partner.name ?? null,
      email: partner.email ?? null,
      phoneNumber: partner.phoneNumber ?? null,
      createdAt: partner.createdAt,
      updatedAt: partner.updatedAt,
    };
  }
}
