import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTask {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
