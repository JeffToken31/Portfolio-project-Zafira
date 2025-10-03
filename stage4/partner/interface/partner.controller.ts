import { Controller, Get } from '@nestjs/common';
import { PartnerService } from '../app/partner.service';

@Controller('partners')
export class PartnerController {
  constructor(private readonly service: PartnerService) {}

  @Get()
  async getAll() {
    return [];
  }
}
