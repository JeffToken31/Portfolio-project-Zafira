import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class Recent-eventsRepository {
  constructor(private readonly prisma: PrismaService) {}
}
