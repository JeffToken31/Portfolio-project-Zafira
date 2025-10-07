import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
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

  // CREATE BLOG
  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'The blog has been created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() dto: CreateBlogDto): Promise<Record<string, unknown>> {
    try {
      const blog: Blog = BlogDtoMapper.toDomainFromCreate(dto);
      const created = await this.blogService.create(blog);
      return created.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An unknown error occurred');
    }
  }

  // FULL UPDATE (PUT)
  @Put(':id')
  @ApiOperation({ summary: 'Fully update a blog' })
  @ApiResponse({ status: 200, description: 'The blog has been updated.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateBlogDto,
  ): Promise<Record<string, unknown>> {
    try {
      // Get existing entity
      const existingBlog = await this.blogService.getById(id);

      // map dto with entity data
      const blogToUpdate = BlogDtoMapper.toDomainFromUpdate(dto, existingBlog);

      // Call service to update
      const updated = await this.blogService.update(blogToUpdate);

      return updated.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An unknown error occurred');
    }
  }

  // PARTIAL UPDATE
  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a blog' })
  @ApiResponse({
    status: 200,
    description: 'The blog has been partially updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
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
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An unknown error occurred');
    }
  }

  // DELETE BLOG
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiResponse({ status: 204, description: 'The blog has been deleted.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.blogService.delete(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An unknown error occurred');
    }
  }

  // GET BLOG BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiResponse({ status: 200, description: 'The blog object.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  async findById(@Param('id') id: string): Promise<Record<string, unknown>> {
    const blog = await this.blogService.getById(id);
    return blog.toJSON();
  }

  // GET LATEST BLOGS
  @Get()
  @ApiOperation({ summary: 'Get latest blogs' })
  @ApiResponse({ status: 200, description: 'List of latest blogs.' })
  async findLatest(
    @Param('limit') limit = 10,
  ): Promise<Record<string, unknown>[]> {
    const blogs = await this.blogService.getLatest(Number(limit));
    return blogs.map((blog) => blog.toJSON());
  }
}
