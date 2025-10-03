import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';
import type { IUserRepository } from '../domain/Iuser.repository';
import { User } from '../domain/user.entity';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  // 🎯 AVANT CHAQUE TEST : Configuration du module de test
  beforeEach(async () => {
    // ✨ ÉTAPE 1 : Créer un MOCK du repository
    // Un mock simule le comportement du vrai repository sans toucher à la DB
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    // ✨ ÉTAPE 2 : Créer le module de test avec les dépendances
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, // Le service à tester
        {
          // 🔑 IMPORTANT : Fournir le mock à la place du vrai repository
          provide: 'IUserRepository', // Le token d'injection (même que dans @Inject)
          useValue: mockUserRepository, // Notre mock
        },
      ],
    }).compile();

    // ✨ ÉTAPE 3 : Récupérer l'instance du service
    service = module.get<UserService>(UserService);
  });

  // ✅ TEST 1 : Vérifier que le service est créé
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ✅ TEST 2 : Inscription d'un utilisateur
  describe('register', () => {
    it('should hash password and create a new user', async () => {
      // 📋 ARRANGE : Préparer les données
      const email = 'test@example.com';
      const password = 'password123';
      const mockCreatedUser = new User(
        'uuid-123',
        email,
        'hashedPassword',
        new Date(),
        new Date(),
      );

      // 🎭 Simuler le comportement du repository
      mockUserRepository.create.mockResolvedValue(mockCreatedUser);

      // 🎬 ACT : Exécuter la méthode à tester
      const result = await service.register(email, password);

      // ✔️ ASSERT : Vérifier les résultats
      expect(result).toBe(mockCreatedUser);
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: email,
          // Le mot de passe doit être hashé (pas le mot de passe en clair)
          password: expect.not.stringContaining(password),
        }),
      );
    });
  });

  // ✅ TEST 3 : Recherche par email
  describe('findByEmail', () => {
    it('should return user when found', async () => {
      const email = 'test@example.com';
      const mockUser = new User(
        'uuid-123',
        email,
        'hashedPassword',
        new Date(),
        new Date(),
      );

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.findByEmail(email);

      expect(result).toBe(mockUser);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should return null when user not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      const result = await service.findByEmail('notfound@example.com');

      expect(result).toBeNull();
    });
  });

  // ✅ TEST 4 : Validation de l'utilisateur
  describe('validateUser', () => {
    it('should return user when credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      // Hash du mot de passe "password123"
      const hashedPassword = await require('bcryptjs').hash(password, 10);
      const mockUser = new User(
        'uuid-123',
        email,
        hashedPassword,
        new Date(),
        new Date(),
      );

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser(email, password);

      expect(result).toBe(mockUser);
    });

    it('should return null when user not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      const mockUser = new User(
        'uuid-123',
        'test@example.com',
        'hashedPassword',
        new Date(),
        new Date(),
      );
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser(
        'test@example.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  // ✅ TEST 5 : Mise à jour d'un utilisateur
  describe('updateUser', () => {
    it('should update user email', async () => {
      const userId = 'uuid-123';
      const mockUser = new User(
        userId,
        'old@example.com',
        'hashedPassword',
        new Date(),
        new Date(),
      );
      const updatedUser = { ...mockUser, email: 'new@example.com' };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.update.mockResolvedValue(updatedUser as User);

      const result = await service.updateUser(userId, {
        email: 'new@example.com',
      });

      expect(result.email).toBe('new@example.com');
      expect(mockUserRepository.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(
        service.updateUser('nonexistent-id', { email: 'test@example.com' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ✅ TEST 6 : Suppression d'un utilisateur
  describe('deleteUser', () => {
    it('should call repository delete method', async () => {
      const userId = 'uuid-123';
      mockUserRepository.delete.mockResolvedValue(undefined);

      await service.deleteUser(userId);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });
  });

  // ✅ TEST 7 : Récupérer tous les utilisateurs
  describe('findAllUsers', () => {
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

      mockUserRepository.findAll.mockResolvedValue(mockUsers);

      const result = await service.findAllUsers();

      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(2);
    });
  });
});
