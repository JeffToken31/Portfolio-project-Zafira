import { Module } from '@nestjs/common';
import { PartnerService } from './app/partner.service';
import { PartnerRepository } from './infra/partner.repository';
import { PartnerController } from './interface/partner.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PartnerController],
  providers: [
    PartnerService,
    { provide: 'IPartnerRepository', useClass: PartnerRepository },
  ],
  exports: [PartnerService],
})
export class PartnerModule {}
