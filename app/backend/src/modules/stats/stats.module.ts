import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { StatsService } from './app/stats.service';
import { StatsController } from './interface/stats.controller';
import { VisitStatsRepository } from './infra/stats.repository';

@Module({
  imports: [PrismaModule],
  controllers: [StatsController],
  providers: [
    StatsService,
    { provide: 'IStatsRepository', useClass: VisitStatsRepository },
  ],
  exports: [StatsService],
})
export class StatsModule {}
