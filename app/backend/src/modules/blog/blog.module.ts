import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { BlogService } from './app/blog.service';
import { BlogController } from './interface/blog.controller';
import { BlogRepository } from './infra/blog.repository';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [BlogController],
  providers: [
    BlogService,
    { provide: 'IBlogRepository', useClass: BlogRepository },
  ],
  exports: [BlogService],
})
export class BlogModule {}
