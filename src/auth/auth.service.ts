import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
import { SignupDto } from 'src/dtos/auth/signup.dto';
import { SigninDto } from 'src/dtos/auth/signin.dto';
import { IAuthUser, User } from 'src/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { SendOtpDto } from 'src/dtos/auth/send-otp.dto';
import { VerifyOtpDto } from 'src/dtos/auth/verify-otp.dto';
import { RequestPasswordResetDto } from 'src/dtos/auth/password-reset.dto';
import * as moment from 'moment';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}
  async signup(signupDto: SignupDto): Promise<any> {
    const { email, username, password } = signupDto;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists.');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return 'Sign up successfully';
  }

  async signin(signinDto: SigninDto): Promise<IAuthUser> {
    const { email, password } = signinDto;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    const { username } = user;
    const userDetails: IAuthUser = {
      token,
      email,
      username,
    };
    return userDetails;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }
    return user;
  }

  async uniqueUser(email: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  async verifyToken(token: string): Promise<User> {
    if (!token) {
      throw new BadRequestException('No token provided.');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.uniqueUser(decoded.email);

      return user;
    } catch (error) {
      throw new BadRequestException(error); // Token verification failed
    }
  }

  //    async logout(userId: number): Promise<string> {
  //    //   console.log(userId);
  //      // due to time, will skip this. hoowever if there was enough time, what i will do is that
  //      // i will make use of both refresh token and access token. the refresh token will be long live,
  //      // while the access token will be short live. when the user logs out we add the token to
  //      // backlist
  //      return 'Logged out successfully.';
  //    }

  async sendOtp(sendOtpDto: SendOtpDto): Promise<string> {
    // first we check if the email exists or not
    const { email } = sendOtpDto;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Email does not exist');
    }
    const otp: string = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.otp.create({
      data: {
        email,
        otp,
        expiresAt: moment().add(15, 'minutes').toDate(),
      },
    });

    return otp;
    // ideally we should send the OTP to the user's email. however, we need third party services such as sendgrip
    // which is an additional overhead right now
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<boolean> {
    const { otp } = verifyOtpDto;
    const isOtpValid = await prisma.otp.findFirst({ where: { otp } });
    if (!isOtpValid) {
      throw new BadRequestException('Invalid otp');
    }
    isOtpValid.isChecked = true;

    const { id } = isOtpValid;

    await prisma.otp.update({
      where: { id },
      data: { isChecked: true },
    });
    return true;
  }

  async resetPassword(
    resetPasswordDto: RequestPasswordResetDto,
  ): Promise<void> {
    const { email, password } = resetPasswordDto;
    const isOtpValid = await prisma.otp.findFirst({ where: { email } });
    if (!isOtpValid) {
      throw new BadRequestException(
        'Whoops, seems like you are yet to request an otp',
      );
    }
    if (!isOtpValid.isChecked) {
      throw new BadRequestException('You need to verify the otp');
    }

    await prisma.otp.deleteMany({ where: { email } });

    await this.userService.updatePassword(email, password);
  }
}
