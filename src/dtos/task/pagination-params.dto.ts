import { IsOptional, IsString } from 'class-validator';

export abstract class PaginationQueryDto {
  @IsOptional()
  @IsString()

  page? : string = "1"

  @IsOptional()
  @IsString()
  perPage? : string = "1"

}
