import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Partner } from '../domain/partner.entity';
import { PartnerMapper } from './partner.mapper';
import type { IPartnerRepository } from '../domain/Ipartner.repository';

@Injectable()
export class PartnerRepository implements IPartnerRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(data: {
    companyName: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    logoUrl: string;
  }): Promise<Partner> {
    const created = await this.prisma.partner.create({ data });
    const domain = PartnerMapper.toDomain(created);
    if (!domain) {
      throw new Error('Failed to map created partner to domain entity');
    }
    return domain;
  }

  async findAll(): Promise<Partner[]> {
    const rows = await this.prisma.partner.findMany();
    return rows.map(PartnerMapper.toDomain);
  }

  async findById(id: string): Promise<Partner | null> {
    const raw = await this.prisma.partner.findUnique({ where: { id } });
    return raw ? PartnerMapper.toDomain(raw) : null;
  }

  async findByCompanyName(companyName: string): Promise<Partner | null> {
    const raw = await this.prisma.partner.findFirst({ where: { companyName } });
    return raw ? PartnerMapper.toDomain(raw) : null;
  }

  async update(partner: Partner): Promise<Partner> {
    const data = PartnerMapper.toPrismaUpdate(partner);
    const updated = await this.prisma.partner.update({
      where: { id: partner.id },
      data,
    });
    const domain = PartnerMapper.toDomain(updated);
    if (!domain) {
      throw new Error('Failed to map updated partner to domain entity');
    }
    return domain;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.partner.delete({ where: { id } });
  }
}
