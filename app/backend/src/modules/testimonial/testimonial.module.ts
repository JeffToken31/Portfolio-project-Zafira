import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TestimonialService } from './app/testimonial.service';
import { TestimonialController } from './interface/testimonial.controller';
import { TestimonialRepository } from './infra/testimonial.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [TestimonialController],
  providers: [
    TestimonialService,
    { provide: 'ITestimonialRepository', useClass: TestimonialRepository },
  ],
  exports: [TestimonialService],
})
export class TestimonialModule {}
