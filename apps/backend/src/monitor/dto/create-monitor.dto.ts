import { IsString, IsUrl, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMonitorDto {
  @ApiProperty({ example: 'Google' })
  @IsString()
  name: string = '';

  @ApiProperty({ example: 'https://google.com' })
  @IsUrl({}, { message: 'Некорректный URL' })
  url: string = '';

  @ApiProperty({ example: 60, required: false })
  @IsInt()
  @Min(60) // минимум раз в минуту
  @Max(3600)
  interval: number = 60;
}
