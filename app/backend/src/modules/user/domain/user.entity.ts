// modules/user/domain/user.entity.ts
import * as bcrypt from 'bcryptjs';

export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string, // hashé
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  updatePassword(newHashedPassword: string) {
    this.password = newHashedPassword;
    this.updatedAt = new Date();
  }
  async setPassword(rawPassword: string) {
    this.password = await bcrypt.hash(rawPassword, 10);
    this.updatedAt = new Date();
  }

  async verifyPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}
