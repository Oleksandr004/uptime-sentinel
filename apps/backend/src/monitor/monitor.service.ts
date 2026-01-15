import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateMonitorDto } from './dto/create-monitor.dto.js';
import { InjectQueue } from '@nestjs/bullmq';
import { Parser } from 'json2csv';
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
        userid: userId, // Обязательное поле после миграции
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
      where: { userid: userId }, // исправлено: userid вместо userId
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
            createdAt: { gte: startDate },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!monitor)
      throw new NotFoundException('Монитор не найден или доступ запрещен');
    return monitor;
  }

  async remove(userId: string, id: string) {
    // Проверяем, существует ли монитор и принадлежит ли он юзеру
    const monitor = await this.prisma.monitor.findFirst({
      where: { id, userId },
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
          take: 5000,
        },
      },
    });

    if (!monitor) throw new NotFoundException('Монитор не найден');

    const data = monitor.checks.map((check) => ({
      'Resource Name': monitor.name,
      URL: monitor.url,
      Date: check.createdAt.toISOString(),
      Status: check.status,
      'Response Time (ms)': check.responseTime,
      'Status Code': check.statusCode || 'N/A',
    }));

    const json2csvParser = new Parser();
    return json2csvParser.parse(data);
  }
}
