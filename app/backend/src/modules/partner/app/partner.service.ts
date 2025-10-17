import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IPartnerRepository } from '../domain/Ipartner.repository';
import { Partner } from '../domain/partner.entity';

@Injectable()
export class PartnerService {
  constructor(
    @Inject('IPartnerRepository')
    private readonly partnerRepo: IPartnerRepository,
  ) {}

  // Get one Partner by ID
  async getById(id: string): Promise<Partner> {
    const partner = await this.partnerRepo.findById(id);
    if (!partner)
      throw new NotFoundException(`Partner with ID ${id} not found`);
    return partner;
  }

  // Get all Partners
  async getAll(): Promise<Partner[]> {
    return this.partnerRepo.findAll();
  }

  // Create a new Partner
  async create(partner: Partner): Promise<Partner> {
    return this.partnerRepo.create(partner);
  }

  // Update an existing Partner
  async update(partner: Partner): Promise<Partner> {
    const existing = await this.partnerRepo.findById(partner.id);
    if (!existing)
      throw new NotFoundException(`Partner with ID ${partner.id} not found`);
    return this.partnerRepo.update(partner);
  }

  // Delete a Partner
  async delete(id: string): Promise<void> {
    const existing = await this.partnerRepo.findById(id);
    if (!existing)
      throw new NotFoundException(`Partner with ID ${id} not found`);
    return this.partnerRepo.delete(id);
  }
}
