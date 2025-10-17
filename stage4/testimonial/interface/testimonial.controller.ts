import { Controller, Get } from '@nestjs/common';
import { TestimonialService } from '../app/testimonial.service';

@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly service: TestimonialService) {}

  @Get()
  async getAll() {
    return [];
  }
}
