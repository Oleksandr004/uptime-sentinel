import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MonitorController } from './monitor.controller.js';
import { MonitorService } from './monitor.service.js';
import { UptimeProcessor } from './uptime.processor.js';
import { EventsGateway } from '../events/events.gateway.js';
import { NotifyService } from '../notify/notify.service.js';
@Module({
  imports: [
    // Регистрируем очередь с именем 'uptime-checks'
    BullModule.registerQueue({
      name: 'uptime-checks',
    }),
  ],
  controllers: [MonitorController],
  providers: [MonitorService, UptimeProcessor, EventsGateway, NotifyService],
})
export class MonitorModule {}
