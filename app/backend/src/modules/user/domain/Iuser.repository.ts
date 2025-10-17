import { User } from './user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  createWithPasswordCredential(user: User, passwordHash: string): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findPasswordHashByUserId(userId: string): Promise<string | null>;
  update(user: User): Promise<User>;
  setEmailVerified(userId: string): Promise<User>;
  delete(id: string): Promise<void>;
  updatePassword(userId: string, passwordHash: string): Promise<void>;
}
