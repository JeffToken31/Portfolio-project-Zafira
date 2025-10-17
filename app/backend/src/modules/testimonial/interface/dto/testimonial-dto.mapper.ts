import { Testimonial } from '../../domain/testimonial.entity';
import { CreateTestimonialDto } from './create-testimonial.dto';
import { UpdateTestimonialDto } from './update-testimonial.dto';

export class TestimonialDtoMapper {
  // --- Create DTO → Domain ---
  static toDomainFromCreate(
    dto: CreateTestimonialDto,
    authorName: string,
    beneficiaryId: string,
  ): Testimonial {
    return new Testimonial(
      crypto.randomUUID(),
      authorName,
      dto.content,
      beneficiaryId,
      dto.validated ?? false,
      dto.published ?? false,
      dto.publishedAt,
    );
  }

  // --- Update DTO → Domain ---
  static toDomainFromUpdate(
    dto: UpdateTestimonialDto,
    existing: Testimonial,
  ): Testimonial {
    return new Testimonial(
      existing.id,
      existing.authorName,
      dto.content ?? existing.content,
      existing.beneficiaryId,
      dto.validated ?? existing.validated,
      dto.published ?? existing.published,
      dto.publishedAt ?? existing.publishedAt,
    );
  }

  // --- Domain → JSON Response ---
  static toResponse(testimonial: Testimonial): Record<string, unknown> {
    return {
      id: testimonial.id,
      authorName: testimonial.authorName,
      content: testimonial.content,
      beneficiaryId: testimonial.beneficiaryId,
      published: testimonial.published,
      publishedAt: testimonial.publishedAt ?? null,
      validated: testimonial.validated,
    };
  }
}
