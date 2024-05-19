import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isJWT } from 'class-validator';
import { AuthService } from 'src/auth/auth.service';
import { IS_PUBLIC_KEY } from 'src/decorators';
import { ICustomRequest } from 'src/interfaces/custom-request.interface';
import { isNull, isUndefined } from 'src/utils/validation.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const client = context.switchToWs().getClient();

    const activate = await this.setHttpHeader(
      context.switchToHttp().getRequest<ICustomRequest>(),
      isPublic,
      client,
    );
    // if its a public route, such as signup e.t.c, we should not have implement auth
    if (!activate) {
      throw new UnauthorizedException();
    }

    return activate;
  }

  /**
   * Sets HTTP Header
   *
   * Checks if the header has a valid Bearer token, validates it and sets the User ID as the user.
   */
  private async setHttpHeader(
    req: ICustomRequest,
    isPublic: boolean,
    client: any,
  ): Promise<boolean> {
    const auth = req.headers?.authorization;
    if (isUndefined(auth) || isNull(auth) || auth.length === 0) {
      return isPublic;
    }

    const authArr = auth.split(' ');
    const bearer = authArr[0];
    const token = authArr[1];

    if (isUndefined(bearer) || isNull(bearer) || bearer !== 'Bearer') {
      return isPublic;
    }
    if (isUndefined(token) || isNull(token) || !isJWT(token)) {
      return isPublic;
    }

    try {
      const formattedPayload = await this.authService.verifyToken(token);

      req.user = formattedPayload.id;
      client.user = req.user;
      return true;
    } catch (_) {
      return isPublic;
    }
  }
}
