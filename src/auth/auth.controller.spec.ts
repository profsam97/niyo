import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('@prisma/client');
jest.mock('src/user/user.service');
jest.mock('@nestjs/jwt');
jest.mock('./auth.service');
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

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
          useValue: {
            sign: jest.fn().mockReturnValue('mockJwtToken'),
            verify: jest.fn(),
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    console.log(userService);
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
  describe('signin', () => {
    it('should sign in a logged in user', async () => {
      const SigninDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const token = 'mockJwtToken';

      const result = {
        email: 'test@example.com',
        token,
        username: 'iamhope',
      };

      (authService.signin as jest.Mock).mockResolvedValue(result);

      jest.spyOn(authService, 'signin').mockImplementation(async () => result);

      expect(await authController.SignIn(SigninDto)).toBe(result);
      expect(authService.signin).toHaveBeenCalledWith(SigninDto);
    });
  });
});
