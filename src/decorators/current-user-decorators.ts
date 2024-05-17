import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICustomRequest } from 'src/interfaces/custom-request.interface';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): string | undefined => {
    return context.switchToHttp().getRequest<ICustomRequest>()?.user;
  },
);
