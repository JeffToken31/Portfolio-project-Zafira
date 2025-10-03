// modules/user/domain/user.repository.ts
import { User } from './user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
}
