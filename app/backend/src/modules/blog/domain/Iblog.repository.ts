import { Blog } from './blog.entity';

export interface IBlogRepository {
  // CRUD operations
  findById(id: string): Promise<Blog | null>;
  findBySlug(slug: string): Promise<Blog | null>;
  findLatest(limit: number, onlyPublished?: boolean): Promise<Blog[]>;

  create(blog: Blog): Promise<Blog>;

  update(blog: Blog): Promise<Blog>;

  delete(id: string): Promise<void>;
}
