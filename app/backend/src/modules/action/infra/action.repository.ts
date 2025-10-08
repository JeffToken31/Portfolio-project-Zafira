import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IBlogRepository } from '../domain/Iaction.repository';
import { Blog } from '../domain/action.entity';
import { BlogMapper, RawBlogData } from './action.mapper';

@Injectable()
export class BlogRepository implements IBlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaToDomain(raw: RawBlogData | null): Blog {
    if (!raw) throw new Error('Blog not found');
    return BlogMapper.toDomain(raw);
  }

  async findById(id: string): Promise<Blog | null> {
    const raw = await this.prisma.blog.findUnique({ where: { id } });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  async findBySlug(slug: string): Promise<Blog | null> {
    const raw = await this.prisma.blog.findUnique({ where: { slug } });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  async findLatest(limit: number): Promise<Blog[]> {
    const raws = await this.prisma.blog.findMany({
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
    return raws.map((raw) => this.mapPrismaToDomain(raw));
  }

  async create(blog: Blog): Promise<Blog> {
    const data = BlogMapper.toPersistence(blog);
    const raw = await this.prisma.blog.create({ data });
    return this.mapPrismaToDomain(raw);
  }

  async update(blog: Blog): Promise<Blog> {
    const data = BlogMapper.toPersistence(blog);
    const raw = await this.prisma.blog.update({
      where: { id: blog.id },
      data,
    });
    return this.mapPrismaToDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.blog.delete({ where: { id } });
  }
}
