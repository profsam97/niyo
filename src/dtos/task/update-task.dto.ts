import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTask {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
