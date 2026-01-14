import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MonitorModule } from './monitor/monitor.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    MonitorModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
