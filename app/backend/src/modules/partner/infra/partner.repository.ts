import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Partner } from '../domain/partner.entity';
import { PartnerMapper, RawPartnerData } from './partner.mapper';
import { IPartnerRepository } from '../domain/Ipartner.repository';

@Injectable()
export class PartnerRepository implements IPartnerRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaToDomain(raw: RawPartnerData | null): Partner {
    if (!raw) throw new Error('Partner not found');
    return PartnerMapper.toDomain(raw);
  }

  async findById(id: string): Promise<Partner | null> {
    const raw = await this.prisma.partner.findUnique({ where: { id } });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  async findByCompanyName(companyName: string): Promise<Partner | null> {
    const raw = await this.prisma.partner.findUnique({
      where: { companyName },
    });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  async findAll(): Promise<Partner[]> {
    const raws = await this.prisma.partner.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((raw) => this.mapPrismaToDomain(raw));
  }

  async create(partner: Partner): Promise<Partner> {
    const data = PartnerMapper.toPersistence(partner);
    const raw = await this.prisma.partner.create({ data });
    return this.mapPrismaToDomain(raw);
  }

  async update(partner: Partner): Promise<Partner> {
    const data = PartnerMapper.toUpdateInput(partner);
    const raw = await this.prisma.partner.update({
      where: { id: partner.id },
      data,
    });
    return this.mapPrismaToDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.partner.delete({ where: { id } });
  }
}
