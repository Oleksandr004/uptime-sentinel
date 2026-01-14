import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Электронная почта' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль (мин. 6 символов)' })
  @IsString()
  @MinLength(6, { message: 'Пароль слишком короткий' })
  password: string;

  @ApiProperty({ example: 'Ivan Ivanov', required: false })
  name?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1Ni...' })
  accessToken: string;

  @ApiProperty({ example: { id: 'uuid', email: 'user@example.com' } })
  user: any;
}