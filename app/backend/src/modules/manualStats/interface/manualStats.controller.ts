import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ManualStatsService } from '../app/manualStats.service';
import { CreateManualStatisticDto } from './dto/create-entry.dto';
import { UpdateManualStatisticDto } from './dto/update-entry.dto';
import { ManualStatsDtoMapper } from './dto/manualStats-dto.mapper';
import { ManualStatistic } from '../domain/manualStats.entity';

@ApiTags('manual-stats')
@Controller('manual-stats')
export class ManualStatsController {
  constructor(private readonly manualStatsService: ManualStatsService) {}

  // --------------------- CREATE ---------------------
  @Post()
  @ApiOperation({ summary: 'Create a new manual statistic' })
  @ApiResponse({
    status: 201,
    description: 'ManualStatistic created successfully',
  })
  async create(
    @Body() dto: CreateManualStatisticDto,
  ): Promise<ManualStatistic> {
    try {
      const stat = ManualStatsDtoMapper.toDomainFromCreate(dto);
      return this.manualStatsService.create(stat);
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  // --------------------- READ ---------------------
  @Get()
  @ApiOperation({ summary: 'Get all manual statistics' })
  @ApiResponse({ status: 200, description: 'List of manual statistics' })
  async findAll(): Promise<ManualStatistic[]> {
    return this.manualStatsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a manual statistic by ID' })
  @ApiResponse({ status: 200, description: 'ManualStatistic found' })
  @ApiResponse({ status: 404, description: 'ManualStatistic not found' })
  async findById(@Param('id') id: string): Promise<ManualStatistic> {
    const stat = await this.manualStatsService.getById(id);
    if (!stat) throw new NotFoundException(`ManualStatistic ${id} not found`);
    return stat;
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get a manual statistic by type' })
  @ApiResponse({ status: 200, description: 'ManualStatistic found' })
  @ApiResponse({ status: 404, description: 'ManualStatistic not found' })
  async findByType(
    @Param('type') type: string,
  ): Promise<ManualStatistic | null> {
    return this.manualStatsService.getByType(type);
  }

  // --------------------- UPDATE ---------------------
  @Put(':id')
  @ApiOperation({ summary: 'Fully update a manual statistic' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateManualStatisticDto,
  ): Promise<ManualStatistic> {
    try {
      return this.manualStatsService.updateById(id, dto);
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a manual statistic' })
  async patch(
    @Param('id') id: string,
    @Body() dto: UpdateManualStatisticDto,
  ): Promise<ManualStatistic> {
    try {
      return this.manualStatsService.updateById(id, dto);
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  // --------------------- DELETE ---------------------
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a manual statistic by ID' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.manualStatsService.delete(id);
      return { message: `ManualStatistic ${id} deleted successfully` };
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }
}
