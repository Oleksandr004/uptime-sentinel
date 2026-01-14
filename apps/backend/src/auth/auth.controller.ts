// import { Response } from 'express'; // <--- КРИТИЧЕСКИ ВАЖНО
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiBearerAuth,
// } from '@nestjs/swagger';
// import { AuthService } from './auth.service.js';
// import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto.js';
// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Post,
//   Res,
//   UseGuards,
// } from '@nestjs/common';
// import { GetUser } from './decorators/get-user.decorator.js';
// import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

// @ApiTags('Авторизация')
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @ApiOperation({ summary: 'Регистрация нового пользователя' })
//   @Post('register')
//   async register(
//     @Body() dto: RegisterDto,
//     @Res({ passthrough: true }) res: Response,
//   ) {
//     const { accessToken, user } = await this.authService.register(dto);
//     this.setCookie(res, accessToken);
//     return { user };
//   }

//   @ApiOperation({ summary: 'Вход в систему' })
//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   async login(
//     @Body() dto: LoginDto,
//     @Res({ passthrough: true }) res: Response,
//   ) {
//     const { accessToken, user } = await this.authService.login(dto);
//     this.setCookie(res, accessToken);
//     return { user };
//   }

//   @ApiOperation({ summary: 'Получить данные текущего пользователя' })
//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @Get('me')
//   async getMe(@GetUser('userId') userId: string) {
//     return this.authService.validateUser(userId);
//   }

//   @ApiOperation({ summary: 'Выход из системы' })
//   @Post('logout')
//   async logout(@Res({ passthrough: true }) res: Response) {
//     res.clearCookie('accessToken');
//     return { message: 'Logged out' };
//   }

//   // Выносим установку куки в отдельный приватный метод, чтобы не дублировать код
//   private setCookie(res: Response, token: string) {
//     // res.cookie('accessToken', token, {
//     //   httpOnly: true,
//     //   secure: process.env.NODE_ENV === 'production',
//     //   sameSite: 'lax', // 'lax' лучше подходит для большинства случаев авторизации
//     //   maxAge: 7 * 24 * 60 * 60 * 1000,
//     // });
//     res.cookie('accessToken', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax', // если фронт и бэк на разных доменах — 'none'
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//   }
// }
import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterDto, LoginDto } from './dto/auth.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { GetUser } from './decorators/get-user.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.register(dto);
    this.setCookie(res, accessToken);
    return { user };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.login(dto);
    this.setCookie(res, accessToken);
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser('userId') userId: string) {
    return this.authService.validateUser(userId);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    return { message: 'Logged out' };
  }

  private setCookie(res: Response, token: string) {
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
