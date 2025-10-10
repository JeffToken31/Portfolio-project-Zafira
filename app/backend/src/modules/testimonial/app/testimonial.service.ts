import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ITestimonialRepository } from '../domain/Itestimonial.repository';
import { Testimonial } from '../domain/testimonial.entity';
import { CreateTestimonialDto } from '../interface/dto/create-testimonial.dto';
import { TestimonialDtoMapper } from '../interface/dto/testimonial-dto.mapper';
import { UserService } from '../../user/app/user.service'; // supposons que tu as un service utilisateur

@Injectable()
export class TestimonialService {
  constructor(
    @Inject('ITestimonialRepository')
    private readonly testimonialRepo: ITestimonialRepository,
    private readonly userService: UserService, // pour récupérer le nom de l'utilisateur
  ) {}

  // --- Get by ID ---
  async getById(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepo.findById(id);
    if (!testimonial)
      throw new NotFoundException(`Testimonial ${id} not found`);
    return testimonial;
  }

  // --- Get all ---
  async getAll(params?: {
    limit?: number;
    published?: boolean;
    validated?: boolean;
  }): Promise<Testimonial[]> {
    return this.testimonialRepo.findAll(params);
  }

  async create(
    dto: CreateTestimonialDto,
    userId: string,
  ): Promise<Testimonial> {
    // Récupération du nom de l'utilisateur depuis le service utilisateur
    const user = await this.userService.findById(userId);
    const authorName = user?.firstName ?? 'Anonymous';

    // Création de l'entité via le mapper
    const testimonial = TestimonialDtoMapper.toDomainFromCreate(
      dto,
      authorName,
      userId, // ici le beneficiaryId
    );

    // Enregistrement dans le repo
    return this.testimonialRepo.create(testimonial);
  }

  // --- Update ---
  async update(testimonial: Testimonial): Promise<Testimonial> {
    const existing = await this.testimonialRepo.findById(testimonial.id);
    if (!existing) {
      throw new NotFoundException(`Testimonial ${testimonial.id} not found`);
    }
    return this.testimonialRepo.update(testimonial);
  }

  // --- Delete ---
  async delete(id: string): Promise<void> {
    const existing = await this.testimonialRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return this.testimonialRepo.delete(id);
  }

  // --- Publish ---
  async publish(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepo.findById(id);
    if (!testimonial) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return this.testimonialRepo.publish(testimonial);
  }

  // --- Unpublish ---
  async unpublish(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepo.findById(id);
    if (!testimonial) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return this.testimonialRepo.unpublish(testimonial);
  }

  // --- Validate ---
  async validate(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepo.findById(id);
    if (!testimonial) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return this.testimonialRepo.validate(testimonial);
  }

  // --- Unvalidate ---
  async unvalidate(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepo.findById(id);
    if (!testimonial) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return this.testimonialRepo.unvalidate(testimonial);
  }
}
