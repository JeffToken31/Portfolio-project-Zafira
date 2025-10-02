import { Injectable } from '@nestjs/common';
import { Recent-eventsRepository } from '../infra/recent-events.repository';

@Injectable()
export class Recent-eventsService {
  constructor(private readonly repo: Recent-eventsRepository) {}
}
