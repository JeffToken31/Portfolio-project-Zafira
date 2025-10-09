import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IActionRepository } from '../domain/Iaction.repository';
import { Action } from '../domain/action.entity';
import { ActionMapper, RawActionData } from './action.mapper';

@Injectable()
export class ActionRepository implements IActionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaToDomain(raw: RawActionData | null): Action {
    if (!raw) throw new Error('Action not found');
    return ActionMapper.toDomain(raw);
  }

  async findById(id: string): Promise<Action | null> {
    const raw = await this.prisma.action.findUnique({ where: { id } });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  async findAll(params?: {
    limit?: number;
    published?: boolean;
  }): Promise<Action[]> {
    const { limit, published } = params || {};

    const raws = await this.prisma.action.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });

    return raws.map((raw) => this.mapPrismaToDomain(raw));
  }

  async create(action: Action): Promise<Action> {
    const data = ActionMapper.toPersistence(action);
    const raw = await this.prisma.action.create({ data });
    return this.mapPrismaToDomain(raw);
  }

  async update(action: Action): Promise<Action> {
    const data = ActionMapper.toUpdateInput(action);
    const raw = await this.prisma.action.update({
      where: { id: action.id },
      data,
    });
    return this.mapPrismaToDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.action.delete({ where: { id } });
  }

  async publish(action: Action): Promise<Action> {
    action.setPublished(true);
    return this.update(action);
  }

  async unpublish(action: Action): Promise<Action> {
    action.setPublished(false);
    return this.update(action);
  }
}
