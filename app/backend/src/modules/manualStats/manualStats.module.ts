import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ManualStatsService } from './app/manualStats.service';
import { ManualStatsController } from './interface/manualStats.controller';
import { ManualStatsRepository } from './infra/manualStats.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ManualStatsController],
  providers: [
    ManualStatsService,
    { provide: 'IManualStatisticRepository', useClass: ManualStatsRepository },
  ],
  exports: [ManualStatsService],
})
export class ManualStatsModule {}
