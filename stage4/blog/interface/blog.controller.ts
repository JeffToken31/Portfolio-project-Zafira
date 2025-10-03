import { Controller, Get } from '@nestjs/common';
import { BlogService } from '../app/blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly service: BlogService) {}

  @Get()
  async getAll() {
    return [];
  }
}
