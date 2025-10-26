import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ActivityService } from './app/activity.service';
import { ActivityController } from './interface/activity.controller';
import { ActivityRepository } from './infra/activity.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    { provide: 'IActivityRepository', useClass: ActivityRepository },
  ],
  exports: [ActivityService],
})
export class ActivityModule {}
