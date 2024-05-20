import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        user: {
          create: jest.fn(),
          findUnique: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findMany: jest.fn(),
          findFirst: jest.fn(),
        },
      };
    }),
  };
});
jest.mock('src/user/user.service');
jest.mock('@nestjs/jwt');
jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: PrismaClient;
  let userService: typeof UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: UserService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockJwtToken'),
            verify: jest.fn(),
            decode: jest.fn(),
          },
        },
        {
          provide: PrismaClient,
          useValue: new (jest.requireMock('@prisma/client').PrismaClient)(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaClient>(PrismaClient);
    userService = module.get<typeof UserService>(UserService);
    jwtService = module.get<typeof jwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    console.log(userService);
  });

  describe('signup', () => {
    it('should create a user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        username: 'iamhope',
        password: 'password',
      };
      const hashedPassword = 'hashedPassword';
      const result = 'Sign up successfully';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (prisma.user.create as jest.Mock).mockResolvedValue(result);

      expect(await authService.signup(createUserDto)).toBe(result);
      expect(bcrypt.hash).toHaveBeenCalledWith('password', undefined);
    });
  });
});
