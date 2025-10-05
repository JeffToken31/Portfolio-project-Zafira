// 📁 Fichier : src/modules/user/interface/user.controller.spec.ts
// ⚠️ REMPLACEZ COMPLÈTEMENT votre fichier actuel par celui-ci

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../app/user.service';
import { User } from '../domain/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: jest.Mocked<UserService>;

  // 🎯 Configuration du module de test AVANT CHAQUE TEST
  beforeEach(async () => {
    // ✨ Créer un MOCK du UserService
    mockUserService = {
      register: jest.fn(),
      findByEmail: jest.fn(),
      validateUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      findAllUsers: jest.fn(),
    } as any;

    // ✨ Créer le module de test avec le mock
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return id and email', async () => {
      const createDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockUser = new User(
        'uuid-123',
        createDto.email,
        'hashedPassword',
        new Date(),
        new Date(),
      );

      mockUserService.register.mockResolvedValue(mockUser);

      const result = await controller.create(createDto);

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
      });
      expect(mockUserService.register).toHaveBeenCalledWith(
        createDto.email,
        createDto.password,
      );
    });
  });

  describe('findOne', () => {
    it('should return user when found', async () => {
      const email = 'test@example.com';
      const mockUser = new User(
        'uuid-123',
        email,
        'hashedPassword',
        new Date(),
        new Date(),
      );

      mockUserService.findByEmail.mockResolvedValue(mockUser);

      const result = await controller.findOne(email);

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
      });
    });

    it('should return null when user not found', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);

      const result = await controller.findOne('notfound@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const mockUsers = [
        new User(
          'uuid-1',
          'user1@example.com',
          'hash1',
          new Date(),
          new Date(),
        ),
        new User(
          'uuid-2',
          'user2@example.com',
          'hash2',
          new Date(),
          new Date(),
        ),
      ];

      mockUserService.findAllUsers.mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(result).toEqual([
        { id: 'uuid-1', email: 'user1@example.com' },
        { id: 'uuid-2', email: 'user2@example.com' },
      ]);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const userId = 'uuid-123';
      const updateDto = { email: 'newemail@example.com' };
      const updatedUser = new User(
        userId,
        updateDto.email,
        'hashedPassword',
        new Date(),
        new Date(),
      );

      mockUserService.updateUser.mockResolvedValue(updatedUser);

      const result = await controller.update(userId, updateDto);

      expect(result).toEqual({
        id: updatedUser.id,
        email: updatedUser.email,
      });
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const userId = 'uuid-123';

      mockUserService.deleteUser.mockResolvedValue(undefined);

      const result = await controller.delete(userId);

      expect(result).toEqual({
        message: `Utilisateur ${userId} supprimé`,
      });
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
