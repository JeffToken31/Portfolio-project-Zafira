import { Action } from '../domain/action.entity';
import { Prisma } from '@prisma/client';

export type RawActionData = Prisma.ActionGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    imageUrl: true;
    published: true;
    publishedAt: true;
  };
}>;

export class ActionMapper {
  // ---------- Mapper Prisma -> Domain ----------
  static toDomain(raw: RawActionData): Action {
    return new Action(
      raw.id,
      raw.title,
      raw.description,
      raw.imageUrl ?? undefined,
      raw.published,
      raw.publishedAt ?? undefined,
    );
  }

  // ---------- Mapper Domain -> Prisma ----------
  static toPersistence(action: Action): Prisma.ActionCreateInput {
    return {
      title: action.title,
      description: action.description,
      imageUrl: action.imageUrl ?? null,
      published: action.published,
      publishedAt: action.publishedAt ?? null,
    };
  }

  static toUpdateInput(action: Action): Prisma.ActionUpdateInput {
    return {
      title: action.title,
      description: action.description,
      imageUrl: action.imageUrl ?? null,
      published: action.published,
      publishedAt: action.publishedAt ?? null,
    };
  }
}
