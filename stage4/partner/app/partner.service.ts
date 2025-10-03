import { Injectable } from '@nestjs/common';
import { PartnerRepository } from '../infra/partner.repository';

@Injectable()
export class PartnerService {
  constructor(private readonly repo: PartnerRepository) {}
}
