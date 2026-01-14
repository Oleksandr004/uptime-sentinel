// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service.js';
// import { CreateMonitorDto } from './dto/create-monitor.dto.js';
// import { InjectQueue } from '@nestjs/bullmq';
// import {Parser} from 'json2csv'
// import { Queue } from 'bullmq';

// @Injectable()
// export class MonitorService {
//   constructor(
//     private prisma: PrismaService,
//     @InjectQueue('uptime-checks') private uptimeQueue: Queue,
//   ) {}

//   async create(userId: string, dto: CreateMonitorDto) {
//     // 1. Сохраняем в базу
//     const monitor = await this.prisma.monitor.create({
//       data: {
//         name: dto.name,
//         url: dto.url,
//         interval: dto.interval,
//         status: 'PENDING',
//       },
//     });

//     // 2. Сюда мы добавим запуск задачи в BullMQ чуть позже
//     console.log(`Монитор создан: ${monitor.id}`);

//     await this.uptimeQueue.add(
//       'check-site',
//       { monitorId: monitor.id, url: monitor.url },
//       {
//         repeat: {
//           every: dto.interval * 1000, // Интервал в мс
//         },
//         jobId: monitor.id, // Чтобы не дублировать задачи
//       },
//     );

//     return monitor;
//   }

//   async findAll() {
//     return this.prisma.monitor.findMany({
//       include: {
//         // Забираем последние 10 проверок для графика
//         checks: {
//           take: 10,
//           orderBy: { createdAt: 'desc' },
//         },
//       },
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   async findOne(id: string, period: string) {
//     const startDate = new Date();
    
//     if (period === '7d') startDate.setDate(startDate.getDate() - 7);
//     else if (period === '30d') startDate.setDate(startDate.getDate() - 30);
//     else startDate.setHours(startDate.getHours() - 24); // По умолчанию 24ч
  
//     const monitor = await this.prisma.monitor.findUnique({
//       where: { id },
//       include: {
//         checks: {
//           where: {
//             createdAt: { gte: startDate } // Фильтр: дата создания >= startDate
//           },
//           orderBy: { createdAt: 'asc' } // Для графика важен порядок от старых к новым
//         }
//       }
//     });
  
//     if (!monitor) throw new NotFoundException('Монитор не найден');
//     return monitor;
//   }

//   async remove(id: string) {
//     // 1. Удаляем повторяющуюся задачу из BullMQ
//     // Мы использовали jobId: monitor.id при создании, поэтому теперь легко её найти
//     const repeatableJobs = await this.uptimeQueue.getRepeatableJobs();
//     const jobData = repeatableJobs.find((job) => job.id === id);

//     if (jobData) {
//       await this.uptimeQueue.removeRepeatableByKey(jobData.key);
//       console.log(`Задание для монитора ${id} удалено из очереди`);
//     }

//     // 2. Удаляем из базы (каскадно удалятся и CheckLogs, если настроено в Prisma)
//     return this.prisma.monitor.delete({
//       where: { id },
//     });
//   }
//   async getDetailedStats(id: string) {
//     const monitor = await this.prisma.monitor.findUnique({
//       where: { id },
//       include: { checks: { orderBy: { createdAt: 'desc' }, take: 100 } }
//     });
  
//     if (!monitor) return null;
  
//     const total = monitor.checks.length;
//     const up = monitor.checks.filter(c => c.status === 'UP').length;
    
//     // Рассчитываем процент доступности
//     const uptimePercentage = total > 0 ? ((up / total) * 100).toFixed(2) : "100.00";
  
//     return {
//       ...monitor,
//       uptimePercentage,
//     };
//   }

//   async exportToCsv(id: string): Promise<string> {
//     const monitor = await this.prisma.monitor.findUnique({
//       where: { id },
//       include: { 
//         checks: {
//           orderBy: { createdAt: 'desc' },
//           take: 5000 // Лимит, чтобы не "положить" память
//         } 
//       },
//     });

//     if (!monitor) throw new NotFoundException('Монитор не найден');

//     // Форматируем данные для CSV
//     const data = monitor.checks.map(check => ({
//       'Resource Name': monitor.name,
//       'URL': monitor.url,
//       'Date': check.createdAt.toISOString(),
//       'Status': check.status,
//       'Response Time (ms)': check.responseTime,
//       'Status Code': check.statusCode || 'N/A'
//     }));

//     // Создаем парсер
//     const json2csvParser = new Parser();
//     const csv = json2csvParser.parse(data);

//     return csv;
//   }
// }
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateMonitorDto } from './dto/create-monitor.dto.js';
import { InjectQueue } from '@nestjs/bullmq';
import { Parser } from 'json2csv'
import { Queue } from 'bullmq';

@Injectable()
export class MonitorService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('uptime-checks') private uptimeQueue: Queue,
  ) {}

  async create(userId: string, dto: CreateMonitorDto) {
    // 1. Сохраняем в базу с привязкой к пользователю
    const monitor = await this.prisma.monitor.create({
      data: {
        name: dto.name,
        url: dto.url,
        interval: dto.interval,
        status: 'PENDING',
        userId: userId, // Обязательное поле после миграции
      },
    });

    // 2. Добавляем задачу в BullMQ (jobId остается monitor.id)
    await this.uptimeQueue.add(
      'check-site',
      { monitorId: monitor.id, url: monitor.url },
      {
        repeat: {
          every: dto.interval * 1000,
        },
        jobId: monitor.id,
      },
    );

    return monitor;
  }

  async findAll(userId: string) {
    return this.prisma.monitor.findMany({
      where: { userId }, // Только мониторы текущего юзера
      include: {
        checks: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string, period: string) {
    const startDate = new Date();
    
    if (period === '7d') startDate.setDate(startDate.getDate() - 7);
    else if (period === '30d') startDate.setDate(startDate.getDate() - 30);
    else startDate.setHours(startDate.getHours() - 24);

    const monitor = await this.prisma.monitor.findFirst({
      where: { id, userId }, // Проверка владения
      include: {
        checks: {
          where: {
            createdAt: { gte: startDate }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });
  
    if (!monitor) throw new NotFoundException('Монитор не найден или доступ запрещен');
    return monitor;
  }

  async remove(userId: string, id: string) {
    // Проверяем, существует ли монитор и принадлежит ли он юзеру
    const monitor = await this.prisma.monitor.findFirst({
      where: { id, userId }
    });

    if (!monitor) throw new NotFoundException('Монитор не найден');

    // 1. Удаляем повторяющуюся задачу из BullMQ
    const repeatableJobs = await this.uptimeQueue.getRepeatableJobs();
    const jobData = repeatableJobs.find((job) => job.id === id);

    if (jobData) {
      await this.uptimeQueue.removeRepeatableByKey(jobData.key);
    }

    // 2. Удаляем из базы
    return this.prisma.monitor.delete({
      where: { id },
    });
  }

  async exportToCsv(userId: string, id: string): Promise<string> {
    const monitor = await this.prisma.monitor.findFirst({
      where: { id, userId },
      include: { 
        checks: {
          orderBy: { createdAt: 'desc' },
          take: 5000 
        } 
      },
    });

    if (!monitor) throw new NotFoundException('Монитор не найден');

    const data = monitor.checks.map(check => ({
      'Resource Name': monitor.name,
      'URL': monitor.url,
      'Date': check.createdAt.toISOString(),
      'Status': check.status,
      'Response Time (ms)': check.responseTime,
      'Status Code': check.statusCode || 'N/A'
    }));

    const json2csvParser = new Parser();
    return json2csvParser.parse(data);
  }
}