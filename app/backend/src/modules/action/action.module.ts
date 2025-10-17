import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ActionService } from './app/action.service';
import { ActionController } from './interface/action.controller';
import { ActionRepository } from './infra/action.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ActionController],
  providers: [
    ActionService,
    { provide: 'IActionRepository', useClass: ActionRepository },
  ],
  exports: [ActionService],
})
export class ActionModule {}
