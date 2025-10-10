import { Testimonial } from '../domain/testimonial.entity';
import { Prisma } from '@prisma/client';

export type RawTestimonialData = Prisma.TestimonialGetPayload<{
  select: {
    id: true;
    authorName: true;
    content: true;
    beneficiaryId: true;
    validated: true;
    published: true;
    publishedAt: true;
  };
}>;

export class TestimonialMapper {
  // --- Prisma → Domaine ---
  static toDomain(raw: RawTestimonialData): Testimonial {
    return new Testimonial(
      raw.id,
      raw.authorName,
      raw.content,
      raw.beneficiaryId ?? undefined,
      raw.validated,
      raw.published,
      raw.publishedAt ?? undefined,
    );
  }

  // --- Domaine → Prisma (création) ---
  static toPersistence(
    testimonial: Testimonial,
  ): Prisma.TestimonialCreateInput {
    return {
      authorName: testimonial.authorName,
      content: testimonial.content,
      beneficiaryId: testimonial.beneficiaryId ?? null,
      validated: testimonial.validated,
      published: testimonial.published,
      publishedAt: testimonial.publishedAt ?? null,
    };
  }

  // --- Domaine → Prisma (mise à jour) ---
  static toUpdateInput(
    testimonial: Testimonial,
  ): Prisma.TestimonialUpdateInput {
    return {
      authorName: testimonial.authorName,
      content: testimonial.content,
      beneficiaryId: testimonial.beneficiaryId ?? null,
      validated: testimonial.validated,
      published: testimonial.published,
      publishedAt: testimonial.publishedAt ?? null,
    };
  }
}
