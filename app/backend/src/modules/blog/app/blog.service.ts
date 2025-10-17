import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IBlogRepository } from '../domain/Iblog.repository';
import { Blog } from '../domain/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @Inject('IBlogRepository') private readonly blogRepo: IBlogRepository,
  ) {}

  async getById(id: string): Promise<Blog> {
    const blog = await this.blogRepo.findById(id);
    if (!blog) throw new NotFoundException(`Blog ${id} not found`);
    return blog;
  }

  async getBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogRepo.findBySlug(slug);
    if (!blog) throw new NotFoundException(`Blog ${slug} not found`);
    return blog;
  }

  async getLatest(limit: number): Promise<Blog[]> {
    return this.blogRepo.findLatest(limit);
  }

  async create(blog: Blog): Promise<Blog> {
    return this.blogRepo.create(blog);
  }

  async update(blog: Blog): Promise<Blog> {
    const existing = await this.blogRepo.findById(blog.id);
    if (!existing) throw new NotFoundException(`Blog ${blog.id} not found`);
    return this.blogRepo.update(blog);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.blogRepo.findById(id);
    if (!existing) throw new NotFoundException(`Blog ${id} not found`);
    return this.blogRepo.delete(id);
  }
}
