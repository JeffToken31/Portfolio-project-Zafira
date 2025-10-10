import { Testimonial } from '../domain/testimonial.entity';

export interface ITestimonialRepository {
  create(testimonial: Testimonial): Promise<Testimonial>;
  update(testimonial: Testimonial): Promise<Testimonial>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Testimonial | null>;
  findAll(params?: {
    limit?: number;
    published?: boolean;
    validated?: boolean;
  }): Promise<Testimonial[]>;
  publish(testimonial: Testimonial): Promise<Testimonial>;
  unpublish(testimonial: Testimonial): Promise<Testimonial>;
  validate(testimonial: Testimonial): Promise<Testimonial>;
  unvalidate(testimonial: Testimonial): Promise<Testimonial>;
}
