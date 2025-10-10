import { Partner } from '../domain/partner.entity';

export interface IPartnerRepository {
  create(partner: Partner): Promise<Partner>;
  update(partner: Partner): Promise<Partner>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Partner | null>;
  findAll(): Promise<Partner[]>;
  findByCompanyName(companyName: string): Promise<Partner | null>;
}
