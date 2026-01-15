import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../../prisma/prisma.service.js'; // Путь к твоему PrismaService

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck() // Декоратор для автоматического формирования ответа
  check() {
    return this.health.check([
      // 1. Проверяем, отвечает ли база данных
      () => this.db.pingCheck('database', this.prisma),

      // 2. Проверяем доступность внешнего API (например, гугла или твоего фронта)
      () => this.http.pingCheck('google', 'https://google.com'),

      // 3. Можно добавить проверку использования памяти (чтобы не было утечек)
      // () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }
}
