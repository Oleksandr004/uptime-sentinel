import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // Делает модуль доступным везде без повторного импорта
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Обязательно экспортируем, чтобы другие могли инжектить сервис
})
export class PrismaModule {}
