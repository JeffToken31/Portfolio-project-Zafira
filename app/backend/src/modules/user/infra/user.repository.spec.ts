import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserRepository } from './user.repository';
import { User } from '../domain/user.entity';

describe('UserRepository', () => {
  let repository: UserRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, PrismaService],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    prisma = module.get<PrismaService>(PrismaService);

    // Optionnel : nettoyer la table avant chaque test
    await prisma.user.deleteMany();
  });

  it('should create and retrieve a user', async () => {
    const user = new User(
      crypto.randomUUID(),
      'test@example.com',
      'hashed-password',
      new Date(),
      new Date(),
    );

    // Création
    const created = await repository.create(user);
    expect(created.id).toBe(user.id);
    expect(created.email).toBe('test@example.com');

    // Récupération
    const fetched = await repository.findById(user.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.email).toBe('test@example.com');
  });

  it('should return null for non-existing user', async () => {
    const fetched = await repository.findById('non-existent-id');
    expect(fetched).toBeNull();
  });
});
