import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
  //UseGuards,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  //ApiBearerAuth,
} from '@nestjs/swagger';
import { PartnerService } from '../app/partner.service';
import { CreatePartnerDto } from './dto/register-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerDtoMapper } from './dto/partner-dto.mapper';
import { Partner } from '../domain/partner.entity';
//import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
//import { RolesGuard } from '../../../common/guards/roles.guard';
//import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('partners')
@Controller('partners')
export class PartnerController {
  constructor(
    @Inject(PartnerService)
    private readonly partnerService: PartnerService,
  ) {}

  // CREATE
  @Post()
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  @ApiOperation({ summary: 'Create a new partner' })
  @ApiResponse({ status: 201, description: 'Partner successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body() dto: CreatePartnerDto,
  ): Promise<Record<string, unknown>> {
    try {
      const partner: Partner = PartnerDtoMapper.toDomainFromCreate(dto);
      const created = await this.partnerService.create(partner);
      return created.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new BadRequestException('Unknown error while creating partner');
    }
  }

  // UPDATE (PUT)
  @Put(':id')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  @ApiOperation({ summary: 'Fully update a partner' })
  @ApiResponse({ status: 200, description: 'Partner successfully updated.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePartnerDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existing = await this.partnerService.getById(id);
      const partnerToUpdate = PartnerDtoMapper.toDomainFromUpdate(
        dto,
        existing,
      );
      const updated = await this.partnerService.update(partnerToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new BadRequestException('Unknown error while updating partner');
    }
  }

  // PARTIAL UPDATE (PATCH)
  @Patch(':id')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  @ApiOperation({ summary: 'Partially update a partner' })
  @ApiResponse({ status: 200, description: 'Partner partially updated.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  async patch(
    @Param('id') id: string,
    @Body() dto: UpdatePartnerDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existing = await this.partnerService.getById(id);
      const partnerToUpdate = PartnerDtoMapper.toDomainFromUpdate(
        dto,
        existing,
      );
      const updated = await this.partnerService.update(partnerToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new BadRequestException('Unknown error while patching partner');
    }
  }

  // DELETE
  @Delete(':id')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a partner' })
  @ApiResponse({ status: 204, description: 'Partner deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  async delete(@Param('id') id: string) {
    try {
      await this.partnerService.delete(id);
      return { message: `Partner ${id} deleted successfully.` };
    } catch (error: unknown) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new BadRequestException('Unknown error while deleting partner');
    }
  }

  // GET ONE BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a partner by ID' })
  @ApiResponse({ status: 200, description: 'Partner details.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  async findById(@Param('id') id: string): Promise<Record<string, unknown>> {
    const partner = await this.partnerService.getById(id);
    return partner.toJSON();
  }

  // GET ALL
  @Get()
  @ApiOperation({ summary: 'Get all partners' })
  @ApiResponse({ status: 200, description: 'List of all partners.' })
  async findAll(): Promise<Record<string, unknown>[]> {
    try {
      const partners = await this.partnerService.getAll();
      return partners.map((p) => p.toJSON());
    } catch (error: unknown) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new BadRequestException('Unknown error while fetching partners');
    }
  }
}
