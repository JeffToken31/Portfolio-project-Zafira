import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { ManualStatsService } from '../app/manualStats.service';
import { CreateManualStatisticEntryDto } from './dto/create-entry.dto';
import { UpdateManualStatisticEntryDto } from './dto/update-entry.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Manual Stats')
@Controller('manual-stats')
export class ManualStatsController {
  constructor(private readonly manualStatsService: ManualStatsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all manual statistics' })
  getAll() {
    return this.manualStatsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a manual statistic by ID' })
  getById(@Param('id') id: string) {
    return this.manualStatsService.getById(id);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get a manual statistic by type' })
  getByType(@Param('type') type: string) {
    return this.manualStatsService.getByType(type);
  }

  @Post(':id/entries')
  @ApiOperation({ summary: 'Add a new entry to a manual statistic' })
  addEntry(
    @Param('id') id: string,
    @Body() dto: CreateManualStatisticEntryDto,
  ) {
    return this.manualStatsService.addEntry(id, dto);
  }

  @Patch(':id/entries/:entryId')
  @ApiOperation({ summary: 'Update a specific entry' })
  updateEntry(
    @Param('id') id: string,
    @Param('entryId') entryId: string,
    @Body() dto: UpdateManualStatisticEntryDto,
  ) {
    return this.manualStatsService.updateEntry(entryId, dto);
  }

  @Delete(':id/entries/:entryId')
  @ApiOperation({ summary: 'Delete a specific entry' })
  deleteEntry(@Param('id') id: string, @Param('entryId') entryId: string) {
    return this.manualStatsService.deleteEntry(entryId);
  }
}
