import { Controller, Get, Param, Query, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ActivityService } from '../app/activity.service';
import { Activity } from '../domain/activity.entity';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(
    @Inject(ActivityService)
    private readonly activityService: ActivityService,
  ) {}

  @Get('recent')
  @ApiOperation({ summary: 'Get recent activities' })
  async getRecent(@Query('limit') limit?: string): Promise<Activity[]> {
    const lim = limit ? parseInt(limit, 10) : 10;
    return this.activityService.getRecent(lim);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get activity by ID' })
  async getById(@Param('id') id: string): Promise<Activity | null> {
    return this.activityService.getById(id);
  }
}
