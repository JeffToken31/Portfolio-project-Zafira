import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ITestimonialRepository } from '../domain/Itestimonial.repository';
import { Testimonial } from '../domain/testimonial.entity';
import { TestimonialMapper, RawTestimonialData } from './testimonial.mapper';

@Injectable()
export class TestimonialRepository implements ITestimonialRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaToDomain(raw: RawTestimonialData | null): Testimonial {
    if (!raw) throw new Error('Testimonial not found');
    return TestimonialMapper.toDomain(raw);
  }

  async findById(id: string): Promise<Testimonial | null> {
    const raw = await this.prisma.testimonial.findUnique({ where: { id } });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  async findByBeneficiaryId(beneficiaryId: string): Promise<Testimonial[]> {
    const raws = await this.prisma.testimonial.findMany({
      where: { beneficiaryId },
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((raw) => this.mapPrismaToDomain(raw));
  }

  async findAll(params?: {
    limit?: number;
    published?: boolean;
    validated?: boolean;
  }): Promise<Testimonial[]> {
    const { limit, published, validated } = params || {};

    const raws = await this.prisma.testimonial.findMany({
      where: {
        ...(published !== undefined ? { published } : {}),
        ...(validated !== undefined ? { validated } : {}),
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });

    return raws.map((raw) => this.mapPrismaToDomain(raw));
  }

  async create(testimonial: Testimonial): Promise<Testimonial> {
    const data = TestimonialMapper.toPersistence(testimonial);
    const raw = await this.prisma.testimonial.create({ data });
    return this.mapPrismaToDomain(raw);
  }

  async update(testimonial: Testimonial): Promise<Testimonial> {
    const data = TestimonialMapper.toUpdateInput(testimonial);
    const raw = await this.prisma.testimonial.update({
      where: { id: testimonial.id },
      data,
    });
    return this.mapPrismaToDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.testimonial.delete({ where: { id } });
  }

  async publish(testimonial: Testimonial): Promise<Testimonial> {
    testimonial.setPublished(true);
    return this.update(testimonial);
  }

  async unpublish(testimonial: Testimonial): Promise<Testimonial> {
    testimonial.setPublished(false);
    return this.update(testimonial);
  }

  async validate(testimonial: Testimonial): Promise<Testimonial> {
    testimonial.setValidated(true);
    return this.update(testimonial);
  }

  async unvalidate(testimonial: Testimonial): Promise<Testimonial> {
    testimonial.setValidated(false);
    return this.update(testimonial);
  }
}
