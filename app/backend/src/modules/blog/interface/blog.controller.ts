import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlogService } from '../app/blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogDtoMapper } from './dto/blog-dto.mapper';
import { Blog } from '../domain/blog.entity';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // CREATE
  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'The blog has been created.' })
  async create(@Body() dto: CreateBlogDto): Promise<Record<string, unknown>> {
    try {
      const blog: Blog = BlogDtoMapper.toDomainFromCreate(dto);
      const created = await this.blogService.create(blog);
      return created.toJSON();
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }

  // READ (GET)

  @Get()
  @ApiOperation({ summary: 'Get all blogs (paginated or limited)' })
  @ApiResponse({ status: 200, description: 'List of blogs.' })
  async findAll(
    @Query('limit') limit = 10,
  ): Promise<Record<string, unknown>[]> {
    const blogs = await this.blogService.getLatest(Number(limit));
    return blogs.map((blog) => blog.toJSON());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiResponse({ status: 200, description: 'The blog object.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  async findById(@Param('id') id: string): Promise<Record<string, unknown>> {
    const blog = await this.blogService.getById(id);
    return blog.toJSON();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a blog by slug (for SEO/SSR)' })
  @ApiResponse({ status: 200, description: 'The blog object.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<Record<string, unknown>> {
    const blog = await this.blogService.getBySlug(slug);
    return blog.toJSON();
  }

  // UPDATE

  @Put(':id')
  @ApiOperation({ summary: 'Fully update a blog' })
  @ApiResponse({ status: 200, description: 'The blog has been updated.' })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateBlogDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existing = await this.blogService.getById(id);
      const blogToUpdate = BlogDtoMapper.toDomainFromUpdate(dto, existing);
      const updated = await this.blogService.update(blogToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a blog' })
  @ApiResponse({
    status: 200,
    description: 'The blog has been partially updated.',
  })
  async patch(
    @Param('id') id: string,
    @Body() dto: UpdateBlogDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existing = await this.blogService.getById(id);
      const blogToUpdate = BlogDtoMapper.toDomainFromUpdate(dto, existing);
      const updated = await this.blogService.update(blogToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }

  // DELETE
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiResponse({ status: 200, description: 'The blog has been deleted.' })
  async delete(@Param('id') id: string) {
    try {
      await this.blogService.delete(id);
      return { message: `Blog ${id} supprimé avec succès` };
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }
}
