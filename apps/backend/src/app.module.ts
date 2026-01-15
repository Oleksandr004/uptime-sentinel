import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MonitorModule } from './monitor/monitor.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // Время жизни в миллисекундах (1 минута)
        limit: 20, // Максимум 20 запросов за ttl
      },
    ]),
    PrismaModule,
    AuthModule,
    MonitorModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Включает защиту глобально для всех контроллеров
    },
  ],
})
export class AppModule {}
