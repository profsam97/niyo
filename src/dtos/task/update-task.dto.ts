import { IsOptional, IsString } from 'class-validator';
import { IsAtLeastOneDefined } from 'src/decorators/custom-validator-decorators';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsAtLeastOneDefined(['name', 'description'], {
    message: 'At least one of name or description must be defined',
  })
  update: string; 
}
