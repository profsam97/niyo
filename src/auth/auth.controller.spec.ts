import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('@prisma/client');
jest.mock('src/user/user.service');
jest.mock('@nestjs/jwt');
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let jwtService: typeof JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: UserService,
        },
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<typeof JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    console.log(userService, jwtService);
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        username: 'iamhope',
        password: 'password',
      };
      const result = 'Sign up successfully';

      jest.spyOn(authService, 'signup').mockImplementation(async () => result);

      expect(await authController.SignUp(createUserDto)).toBe(result);
    });
  });

  // Add tests for other endpoints similarly...
});
