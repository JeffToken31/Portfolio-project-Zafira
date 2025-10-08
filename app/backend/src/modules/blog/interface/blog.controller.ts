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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BlogService } from '../app/blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogDtoMapper } from './dto/blog-dto.mapper';
import { Blog } from '../domain/blog.entity';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('beneficiary')
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

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Fully update a blog' })
  @ApiResponse({ status: 200, description: 'The blog has been updated.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateBlogDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existingBlog = await this.blogService.getById(id);
      const blogToUpdate = BlogDtoMapper.toDomainFromUpdate(dto, existingBlog);
      const updated = await this.blogService.update(blogToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An unknown error occurred');
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('beneficiary')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiResponse({ status: 200, description: 'The blog has been deleted.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  async delete(@Param('id') id: string) {
    try {
      await this.blogService.delete(id);
      return { message: `Utilisateur ${id} supprimé` };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An unknown error occurred');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiResponse({ status: 200, description: 'The blog object.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  async findById(@Param('id') id: string): Promise<Record<string, unknown>> {
    const blog = await this.blogService.getById(id);
    return blog.toJSON();
  }

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
