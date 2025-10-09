import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IPartnerRepository } from '../domain/Ipartner.repository';
import { Partner } from '../domain/partner.entity';
import { PartnerMapper } from '../infra/partner.mapper';

@Injectable()
export class PartnerService {
  constructor(@Inject('IPartnerRepository') private readonly partnerRepo: IPartnerRepository) {}

  async createPartner(partner: Partner): Promise<Partner> {
    const data = PartnerMapper.toPrismaCreate(partner);
    const raw = await this.partnerRepo.create({ data });
    return raw;
  }

private mapPrismaToDomain(raw: any) {
  return {
    id: raw.id,
    companyName: raw.companyName,
    name: raw.name,
    email: raw.email,
    phoneNumber: raw.phoneNumber,
    logoUrl: raw.logoUrl,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };

  
}







  async getAllPartners(): Promise<Partner[]> {
    return this.partnerRepo.findAll();
  }

  async getPartnerById(id: string): Promise<Partner> {
    const partner = await this.partnerRepo.findById(id);
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }

  async updatePartner(
    id: string,
    companyName?: string,
    name?: string,
    email?: string,
    phoneNumber?: string,
    logoUrl?: string,
  ): Promise<Partner> {
    const existing = await this.getPartnerById(id);
    if (companyName !== undefined) existing.companyName = companyName;
    if (name !== undefined) existing.name = name;
    if (email !== undefined) existing.email = email;
    if (phoneNumber !== undefined) existing.phoneNumber = phoneNumber;
    if (logoUrl !== undefined) existing.logoUrl = logoUrl;
    existing['updatedAt'] = new Date();
    return this.partnerRepo.update(existing);
  }

  async deletePartner(id: string): Promise<void> {
    await this.getPartnerById(id);
    await this.partnerRepo.delete(id);
  }
}
