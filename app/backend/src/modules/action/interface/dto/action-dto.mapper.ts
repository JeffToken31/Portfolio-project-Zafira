import { Blog, MediaType } from '../../domain/action.entity';
import { CreateBlogDto } from './create-action.dto';
import { UpdateBlogDto } from './update-action.dto';

// Helper to check the mediaType //
function parseMediaType(
  value: string | null | undefined,
): MediaType | undefined {
  if (!value) return undefined;
  return Object.values(MediaType).includes(value as MediaType)
    ? (value as MediaType)
    : undefined;
}

export class BlogDtoMapper {
  // Map CreateBlogDto to Domain  //
  static toDomainFromCreate(dto: CreateBlogDto): Blog {
    return new Blog(
      crypto.randomUUID(),
      dto.title,
      dto.slug,
      dto.content,
      dto.excerpt ?? '',
      dto.coverImageUrl ?? undefined,
      dto.mediaUrl ?? undefined,
      parseMediaType(dto.mediaType),
      dto.published ?? false,
      dto.publishedAt ?? undefined,
    );
  }

  //  Map UpdateBlogDto to Domain  //
  static toDomainFromUpdate(dto: UpdateBlogDto, existing: Blog): Blog {
    return new Blog(
      existing.id,
      dto.title ?? existing.title,
      dto.slug ?? existing.slug,
      dto.content ?? existing.content,
      dto.excerpt ?? existing.excerpt,
      dto.coverImageUrl ?? existing.coverImageUrl,
      dto.mediaUrl ?? existing.mediaUrl,
      dto.mediaType ? parseMediaType(dto.mediaType) : existing.mediaType,
      dto.published ?? existing.published,
      dto.publishedAt ?? existing.publishedAt,
    );
  }

  //Map Domain to Plain Object (Swagger/Postman)//
  static toResponse(blog: Blog): Record<string, unknown> {
    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt ?? '',
      coverImageUrl: blog.coverImageUrl ?? null,
      mediaUrl: blog.mediaUrl ?? null,
      mediaType: blog.mediaType ?? null,
      published: blog.published,
      publishedAt: blog.publishedAt ?? null,
    };
  }
}
