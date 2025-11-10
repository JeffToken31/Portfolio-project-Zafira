export type Role = 'ADMIN' | 'BENEFICIARY';

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public firstName: string | null = null,
    public lastName: string | null = null,
    public role: Role = 'BENEFICIARY',
    public emailVerified: boolean = false,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  setEmailVerified(value = true) {
    this.emailVerified = value;
    this.touch();
  }

  updateName(firstName?: string, lastName?: string) {
    if (firstName !== undefined) this.firstName = firstName;
    if (lastName !== undefined) this.lastName = lastName;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      emailVerified: this.emailVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
