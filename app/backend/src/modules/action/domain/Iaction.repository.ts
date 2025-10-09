import { Action } from '../domain/action.entity';

export interface IActionRepository {
  create(action: Action): Promise<Action>;
  update(action: Action): Promise<Action>;
  delete(id: string): Promise<void>;
  findAll(params?: { limit?: number; published?: boolean }): Promise<Action[]>;
  findById(id: string): Promise<Action | null>;
  publish(action: Action): Promise<Action>;
  unpublish(action: Action): Promise<Action>;
}
