import { Blog, MediaType } from '../domain/action.entity';
import { Prisma } from '@prisma/client';

// Type strict pour les données Prisma
export type RawBlogData = Prisma.BlogGetPayload<{
  select: {
    id: true;
    title: true;
    slug: true;
    content: true;
    excerpt: true;
    coverImageUrl: true;
    mediaUrl: true;
    mediaType: true;
    published: true;
    publishedAt: true;
  };
}>;

// Helper pour convertir string | null → MediaType | undefined
function parseMediaType(
  value: string | null | undefined,
): MediaType | undefined {
  if (!value) return undefined;
  return Object.values(MediaType).includes(value as MediaType)
    ? (value as MediaType)
    : undefined;
}

export class BlogMapper {
  // ---------- Mapper Prisma -> Domain ----------
  static toDomain(raw: RawBlogData): Blog {
    return new Blog(
      raw.id,
      raw.title,
      raw.slug,
      raw.content,
      raw.excerpt ?? '',
      raw.coverImageUrl ?? undefined,
      raw.mediaUrl ?? undefined,
      parseMediaType(raw.mediaType),
      raw.published,
      raw.publishedAt ?? undefined,
    );
  }

  // ---------- Mapper Domain -> Prisma ----------
  static toPersistence(blog: Blog): Prisma.BlogCreateInput {
    return {
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

  static toUpdateInput(blog: Blog): Prisma.BlogUpdateInput {
    return {
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      coverImageUrl: blog.coverImageUrl ?? null,
      mediaUrl: blog.mediaUrl ?? null,
      mediaType: blog.mediaType ?? null,
      published: blog.published,
      publishedAt: blog.publishedAt ?? null,
    };
  }
}
