import { Action } from '../../domain/action.entity';
import { CreateActionDto } from './create-action.dto';
import { UpdateActionDto } from './update-action.dto';

export class ActionDtoMapper {
  // 🔹 Map CreateActionDto -> Domain
  static toDomainFromCreate(dto: CreateActionDto): Action {
    return new Action(
      crypto.randomUUID(),
      dto.title,
      dto.description,
      dto.imageUrl ?? undefined,
      dto.published ?? false,
      dto.publishedAt ?? undefined,
    );
  }

  // 🔹 Map UpdateActionDto -> Domain (merge avec l’existant)
  static toDomainFromUpdate(dto: UpdateActionDto, existing: Action): Action {
    return new Action(
      existing.id,
      dto.title ?? existing.title,
      dto.description ?? existing.description,
      dto.imageUrl ?? existing.imageUrl,
      dto.published ?? existing.published,
      dto.publishedAt ?? existing.publishedAt,
    );
  }

  // 🔹 Domain -> JSON Response (Swagger/Postman)
  static toResponse(action: Action): Record<string, unknown> {
    return {
      id: action.id,
      title: action.title,
      description: action.description,
      imageUrl: action.imageUrl ?? null,
      published: action.published,
      publishedAt: action.publishedAt ?? null,
    };
  }
}
