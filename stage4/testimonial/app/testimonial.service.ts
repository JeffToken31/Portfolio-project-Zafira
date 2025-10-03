import { Injectable } from '@nestjs/common';
import { TestimonialRepository } from '../infra/testimonial.repository';

@Injectable()
export class TestimonialService {
  constructor(private readonly repo: TestimonialRepository) {}
}
