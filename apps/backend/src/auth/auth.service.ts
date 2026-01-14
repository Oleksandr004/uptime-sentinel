// import {
//   Injectable,
//   ConflictException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { PrismaService } from '../../prisma/prisma.service.js';
// import { RegisterDto, LoginDto } from './dto/auth.dto.js';
// import { JwtPayload } from './jwt-payload.interface.js';

// @Injectable()
// export class AuthService {
//   constructor(
//     private prisma: PrismaService,
//     private jwtService: JwtService,
//   ) {}

//   async register(dto: RegisterDto) {
//     const candidate = await this.prisma.user.findUnique({
//       where: { email: dto.email },
//     });
//     if (candidate)
//       throw new ConflictException('Пользователь с таким email уже существует');

//     const hashedPassword = await bcrypt.hash(dto.password, 10);

//     const user = await this.prisma.user.create({
//       data: {
//         email: dto.email,
//         password: hashedPassword,
//         name: dto.name,
//       },
//     });

//     return this.generateToken(user);
//   }

//   async login(dto: LoginDto) {
//     const user = await this.prisma.user.findUnique({
//       where: { email: dto.email },
//     });
//     if (!user) throw new UnauthorizedException('Неверные учетные данные');
//     if (!user.password) {
//       throw new UnauthorizedException('Неверные учетные данные');
//     }

//     const isPasswordValid = await bcrypt.compare(dto.password, user.password);
//     if (!isPasswordValid)
//       throw new UnauthorizedException('Неверные учетные данные');

//     return this.generateToken(user);
//   }

//   async validateUser(userId: string) {
//     const user = await this.prisma.user.findUnique({
//       where: { id: userId },
//       select: { id: true, email: true, name: true }, // Пароль не возвращаем!
//     });

//     if (!user) throw new UnauthorizedException();
//     return user;
//   }

//   private async generateToken(user: any) {
//     const payload: JwtPayload = { userId: user.id, email: user.email };

//     return {
//       accessToken: this.jwtService.sign(payload),
//       user: { id: user.id, email: user.email, name: user.name ?? '' },
//     };
//   }
// }
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RegisterDto, LoginDto } from './dto/auth.dto.js';
import { JwtPayload } from './jwt-payload.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const candidate = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (candidate)
      throw new ConflictException('Пользователь с таким email уже существует');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hashedPassword, name: dto.name },
    });

    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    const dbInfo = await this.prisma.$queryRaw<
      { current_database: string; current_schema: string }[]
    >`SELECT current_database(), current_schema();`;

    console.log('DBDBDBDBDBDBDBDBDBDB', dbInfo);
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.password)
      throw new UnauthorizedException('Неверные учетные данные');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Неверные учетные данные');

    return this.generateToken(user);
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });

    if (!user) throw new UnauthorizedException();
    return user;
  }

  private async generateToken(user: any) {
    const payload: JwtPayload = { userId: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.name ?? '' },
    };
  }
}
