// import { Processor, WorkerHost } from '@nestjs/bullmq';
// import { Job } from 'bullmq';
// import { PrismaService } from '../../prisma/prisma.service.js';
// import { EventsGateway } from '../events/events.gateway.js';
// import axios from 'axios';

// @Processor('uptime-checks')
// export class UptimeProcessor extends WorkerHost {
//   constructor(
//     private prisma: PrismaService,
//     private eventsGateway: EventsGateway,
//   ) {
//     super();
//   }

//   async process(job: Job<{ monitorId: string; url: string }>): Promise<any> {
//     const { monitorId, url } = job.data;
//     const startTime = Date.now();

//     try {
//       // 1. Делаем реальный запрос к сайту
//       const response = await axios.get(url, { timeout: 10000 }); // таймаут 10 сек
//       const responseTime = Date.now() - startTime;

//       // 2. Сохраняем лог успешной проверки
//       await this.prisma.checkLog.create({
//         data: {
//           monitorId,
//           status: 'UP',
//           statusCode: response.status,
//           responseTime,
//         },
//       });

//       // 3. Обновляем статус самого монитора
//       await this.prisma.monitor.update({
//         where: { id: monitorId },
//         data: { status: 'UP' },
//       });
//       this.eventsGateway.sendMonitorUpdate(monitorId, {
//         status: 'UP',
//         latency: responseTime,
//       });

//       console.log(`✅ ${url} is UP (${responseTime}ms)`);
//     } catch (error: any) {
//       const responseTime = Date.now() - startTime;

//       // 4. Если сайт лежит (ошибка 4xx, 5xx или таймаут)
//       await this.prisma.checkLog.create({
//         data: {
//           monitorId,
//           status: 'DOWN',
//           statusCode: error.response?.status || 0,
//           responseTime,
//         },
//       });

//       await this.prisma.monitor.update({
//         where: { id: monitorId },
//         data: { status: 'DOWN' },
//       });
//       this.eventsGateway.sendMonitorUpdate(monitorId, {
//         status: 'DOWN',
//         latency: responseTime,
//       });
//       console.log(`❌ ${url} is DOWN`);

//       // Сюда можно добавить логику создания Incident или отправку в Telegram
//     }
//   }
// }
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
      const response = await axios.get(url, { timeout: 10000 });
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