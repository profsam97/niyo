import { BadGatewayException, BadRequestException } from "@nestjs/common";

export function errorHandler (error : any) {
    if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadGatewayException({
          statusCode: 500,
          message: 'Internal server error',
          error: 'InternalServerError',
        });
      }
}

