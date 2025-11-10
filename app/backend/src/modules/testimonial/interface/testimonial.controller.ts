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
  UseGuards,
  Inject,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { TestimonialService } from '../app/testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { TestimonialDtoMapper } from './dto/testimonial-dto.mapper';
import { Testimonial } from '../domain/testimonial.entity';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import type { JwtUser } from '../../../common/interfaces/jwt-user.interface';

@ApiTags('testimonials')
@Controller('testimonials')
export class TestimonialController {
  constructor(
    @Inject(TestimonialService)
    private readonly testimonialService: TestimonialService,
  ) {}

  // CREATE
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('beneficiary')
  @ApiOperation({ summary: 'Create a new testimonial' })
  @ApiResponse({
    status: 201,
    description: 'Testimonial successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body() dto: CreateTestimonialDto,
    @Req() req: { user: JwtUser },
  ): Promise<Record<string, unknown>> {
    try {
      const userId = req.user.id;
      const authorName = req.user.name ?? 'Anonymous';

      const testimonial: Testimonial = TestimonialDtoMapper.toDomainFromCreate(
        dto,
        authorName,
        userId,
      );

      const created = await this.testimonialService.create(testimonial, userId);

      return created.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while creating testimonial');
    }
  }

  // UPDATE (PUT)
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('beneficiary')
  @ApiOperation({ summary: 'Fully update a testimonial' })
  @ApiResponse({
    status: 200,
    description: 'Testimonial successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateTestimonialDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existing = await this.testimonialService.getById(id);
      const testimonialToUpdate = TestimonialDtoMapper.toDomainFromUpdate(
        dto,
        existing,
      );
      const updated = await this.testimonialService.update(testimonialToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while updating testimonial');
    }
  }

  // PATCH (PARTIAL UPDATE)
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Partially update a testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial partially updated.' })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  async patch(
    @Param('id') id: string,
    @Body() dto: UpdateTestimonialDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existing = await this.testimonialService.getById(id);
      const testimonialToUpdate = TestimonialDtoMapper.toDomainFromUpdate(
        dto,
        existing,
      );
      const updated = await this.testimonialService.update(testimonialToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while patching testimonial');
    }
  }

  // DELETE
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a testimonial by ID' })
  @ApiResponse({ status: 204, description: 'Testimonial deleted.' })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  async delete(@Param('id') id: string) {
    try {
      await this.testimonialService.delete(id);
      return { message: `Testimonial ${id} deleted successfully.` };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while deleting testimonial');
    }
  }

  // GET testimonials of the connected beneficiary
  @Get('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('beneficiary')
  @ApiOperation({
    summary: 'Get all testimonials of the logged-in beneficiary',
  })
  @ApiResponse({ status: 200, description: 'List of testimonials by user.' })
  async findMyTestimonials(
    @Req() req: { user: JwtUser },
  ): Promise<Record<string, unknown>[]> {
    try {
      const userId = req.user.id;
      const testimonials =
        await this.testimonialService.getByBeneficiaryId(userId);
      return testimonials.map((t) => t.toJSON());
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Unknown error while fetching user testimonials',
      );
    }
  }

  // GET ONE BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a testimonial by ID' })
  @ApiResponse({ status: 200, description: 'Testimonial details.' })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  async findById(@Param('id') id: string): Promise<Record<string, unknown>> {
    const testimonial = await this.testimonialService.getById(id);
    return testimonial.toJSON();
  }

  // GET ALL / FILTERED / LIMITED
  @Get()
  @ApiOperation({
    summary: 'Get all testimonials (with optional filters)',
    description:
      'Supports query params like `?limit=3`, `?published=true` or `?validated=true` for filtering.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit the number of returned testimonials',
  })
  @ApiQuery({
    name: 'published',
    required: false,
    type: Boolean,
    description: 'Filter only published testimonials',
  })
  @ApiQuery({
    name: 'validated',
    required: false,
    type: Boolean,
    description: 'Filter only validated testimonials',
  })
  @ApiResponse({ status: 200, description: 'List of testimonials.' })
  async findAll(
    @Query('limit') limit?: number,
    @Query('published') published?: boolean,
    @Query('validated') validated?: boolean,
  ): Promise<Record<string, unknown>[]> {
    try {
      const testimonials = await this.testimonialService.getAll({
        limit: limit ? Number(limit) : undefined,
        published:
          typeof published === 'string'
            ? published === 'true'
            : (published ?? undefined),
        validated:
          typeof validated === 'string'
            ? validated === 'true'
            : (validated ?? undefined),
      });
      return testimonials.map((t) => t.toJSON());
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Unknown error while fetching testimonials',
      );
    }
  }

  // PUBLISH / UNPUBLISH
  @Patch(':id/publish')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Publish a testimonial' })
  @ApiResponse({
    status: 200,
    description: 'Testimonial published successfully.',
  })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  async publish(@Param('id') id: string) {
    const testimonial = await this.testimonialService.publish(id);
    return TestimonialDtoMapper.toResponse(testimonial);
  }

  @Patch(':id/unpublish')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Unpublish a testimonial' })
  @ApiResponse({
    status: 200,
    description: 'Testimonial unpublished successfully.',
  })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  async unpublish(@Param('id') id: string) {
    const testimonial = await this.testimonialService.unpublish(id);
    return TestimonialDtoMapper.toResponse(testimonial);
  }

  // VALIDATE / UNVALIDATE
  @Patch(':id/validate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Validate a testimonial' })
  @ApiResponse({
    status: 200,
    description: 'Testimonial validated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  async validate(@Param('id') id: string) {
    const testimonial = await this.testimonialService.validate(id);
    return TestimonialDtoMapper.toResponse(testimonial);
  }

  @Patch(':id/unvalidate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Unvalidate a testimonial' })
  @ApiResponse({
    status: 200,
    description: 'Testimonial unvalidated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  async unvalidate(@Param('id') id: string) {
    const testimonial = await this.testimonialService.unvalidate(id);
    return TestimonialDtoMapper.toResponse(testimonial);
  }
}
