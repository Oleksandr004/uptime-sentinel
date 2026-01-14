import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Res,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { MonitorService } from './monitor.service.js';
import { CreateMonitorDto } from './dto/create-monitor.dto.js';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiBody,
  ApiProduces,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface.js';
import { GetUser } from '../auth/decorators/get-user.decorator.js';

@ApiTags('Monitors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('monitors')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый монитор' })
  @ApiBody({ type: CreateMonitorDto })
  @ApiCreatedResponse({ description: 'Монитор успешно создан' })
  create(@Body() dto: CreateMonitorDto, @GetUser('userId') userId: string) {
    return this.monitorService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех мониторов пользователя' })
  @ApiOkResponse({ description: 'Список мониторов успешно получен' })
  findAll(@GetUser('userId') userId: string) {
    return this.monitorService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить монитор по ID с фильтрацией истории' })
  @ApiParam({ name: 'id', description: 'ID монитора' })
  @ApiQuery({ name: 'period', required: false, enum: ['24h', '7d', '30d'] })
  findOne(
    @Param('id') id: string,
    @Query('period') period: string = '24h',
    @Req() req: RequestWithUser,
  ) {
    return this.monitorService.findOne(req.user.userId, id, period);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить монитор' })
  @ApiParam({ name: 'id', description: 'ID монитора' })
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.monitorService.remove(userId, id);
  }

  @Get(':id/export-csv')
  @ApiOperation({ summary: 'Экспорт истории проверок в CSV файл' })
  @ApiProduces('text/csv')
  async downloadCsv(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: RequestWithUser,
  ) {
    const csv = await this.monitorService.exportToCsv(req.user.userId, id);

    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment(`monitor-report-${id}.csv`);

    return res.send('\uFEFF' + csv);
  }
}
