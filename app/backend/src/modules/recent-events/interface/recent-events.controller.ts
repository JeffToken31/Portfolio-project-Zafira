import { Controller, Get } from '@nestjs/common';
import { Recent-eventsService } from '../app/recent-events.service';

@Controller('recent-eventss')
export class Recent-eventsController {
  constructor(private readonly service: Recent-eventsService) {}

  @Get()
  async getAll() {
    return [];
  }
}
