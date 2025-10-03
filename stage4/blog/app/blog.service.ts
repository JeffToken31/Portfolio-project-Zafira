import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../infra/blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly repo: BlogRepository) {}
}
