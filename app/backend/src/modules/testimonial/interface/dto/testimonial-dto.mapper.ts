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
      crypto.randomUUID(), // id
      authorName, // authorName issu du JWT
      dto.content, // contenu du témoignage
      beneficiaryId, // beneficiaryId issu du JWT
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
      existing.authorName, // authorName non modifiable
      dto.content ?? existing.content,
      existing.beneficiaryId, // beneficiaryId non modifiable
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
