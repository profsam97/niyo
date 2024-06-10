import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/dtos/auth/signup.dto';
import { IMessage } from 'src/interfaces/message.interface';
import { SigninDto } from 'src/dtos/auth/signin.dto';
import { IAuthUser } from 'src/interfaces/user.interface';
import { errorHandler } from 'src/utils/errorHandler';
import { Public } from 'src/decorators';
import { SendOtpDto } from 'src/dtos/auth/send-otp.dto';
import { VerifyOtpDto } from 'src/dtos/auth/verify-otp.dto';
import { RequestPasswordResetDto } from 'src/dtos/auth/password-reset.dto';

@Injectable()
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('/sign-up')
  public async SignUp(@Body() signUpDto: SignupDto): Promise<IMessage> {
    try {
      console.log('sdsd');
      return await this.authService.signup(signUpDto);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  @Public()
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  public async SignIn(@Body() signInDto: SigninDto): Promise<IAuthUser> {
    return await this.authService.signin(signInDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<string> {
    const otp: string = await this.authService.sendOtp(sendOtpDto);
    return otp;
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<string> {
    try {
      await this.authService.verifyOtp(verifyOtpDto);
      return 'Verified successfully, please reset';
    } catch (error) {
      errorHandler(error);
    }
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordDto: RequestPasswordResetDto,
  ): Promise<string> {
    try {
      await this.authService.resetPassword(resetPasswordDto);
      return 'Password reset was successful';
    } catch (error) {
      errorHandler(error);
    }
  }
}
