import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { NotifyService } from '../notify/notify.service.js'; // Импортируем ваш сервис
import axios from 'axios';

@Processor('uptime-checks')
export class UptimeProcessor extends WorkerHost {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
    private notifyService: NotifyService, // Внедряем сервис уведомлений
  ) {
    super();
  }

  async process(job: Job<{ monitorId: string; url: string }>): Promise<any> {
    const { monitorId, url } = job.data;
    const startTime = Date.now();

    // 1. Получаем текущее состояние монитора ДО проверки
    const monitor = await this.prisma.monitor.findUnique({
      where: { id: monitorId },
    });

    if (!monitor) return;

    try {
      const response = await axios.get(url, {
        timeout: 1000,
        headers: { 'User-Agent': 'SentinelMonitor/1.0' },
      });
      const responseTime = Date.now() - startTime;

      // 2. Логируем успех
      await this.prisma.checkLog.create({
        data: {
          monitorId,
          status: 'UP',
          statusCode: response.status,
          responseTime,
        },
      });

      // 3. Обновляем монитор
      await this.prisma.monitor.update({
        where: { id: monitorId },
        data: { status: 'UP' },
      });

      // 4. ЛОГИКА УВЕДОМЛЕНИЯ: Если раньше лежал, а теперь ожил
      if (monitor.status === 'DOWN') {
        await this.notifyService.sendRecovery(monitor.name, url);
      }

      this.eventsGateway.sendMonitorUpdate(monitorId, {
        status: 'UP',
        latency: responseTime,
      });

      console.log(`✅ ${url} is UP (${responseTime}ms)`);
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      const errorMessage = error.message || 'Unknown Error';

      await this.prisma.checkLog.create({
        data: {
          monitorId,
          status: 'DOWN',
          statusCode: error.response?.status || 0,
          responseTime,
        },
      });

      await this.prisma.monitor.update({
        where: { id: monitorId },
        data: { status: 'DOWN' },
      });

      // 5. ЛОГИКА УВЕДОМЛЕНИЯ: Если раньше работал, а теперь упал
      if (monitor.status === 'UP' || monitor.status === 'PENDING') {
        await this.notifyService.sendAlert(
          monitor.name,
          url,
          `Status: ${error.response?.status || 'Timeout'} - ${errorMessage}`,
        );
      }

      this.eventsGateway.sendMonitorUpdate(monitorId, {
        status: 'DOWN',
        latency: responseTime,
      });

      console.log(`❌ ${url} is DOWN`);
    }
  }
}
