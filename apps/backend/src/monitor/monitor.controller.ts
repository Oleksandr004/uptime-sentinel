
// import { Controller, Post, Get, Body, Delete, Param, Res } from '@nestjs/common'
// import { Response } from 'express'
// import { MonitorService } from './monitor.service.js'
// import { CreateMonitorDto } from './dto/create-monitor.dto.js'

// import {
//   ApiTags,
//   ApiOperation,
//   ApiCreatedResponse,
//   ApiOkResponse,
//   ApiNotFoundResponse,
//   ApiParam,
//   ApiBody,
// } from '@nestjs/swagger'

// @ApiTags('Monitors')
// @Controller('monitors')
// export class MonitorController {
//   constructor(private readonly monitorService: MonitorService) {}

//   @Post()
//   @ApiOperation({ summary: 'Создать новый монитор' })
//   @ApiBody({ type: CreateMonitorDto })
//   @ApiCreatedResponse({
//     description: 'Монитор успешно создан',
//   })
//   create(@Body() dto: CreateMonitorDto) {
//     return this.monitorService.create(dto)
//   }

//   @Get()
//   @ApiOperation({ summary: 'Получить список всех мониторов' })
//   @ApiOkResponse({
//     description: 'Список мониторов успешно получен',
//   })
//   findAll() {
//     return this.monitorService.findAll()
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Получить монитор по ID' })
//   @ApiParam({
//     name: 'id',
//     description: 'ID монитора',
//     example: 'c8f2e3a1-5d6b-4a9b-9e4a-123456789abc',
//   })
//   @ApiOkResponse({
//     description: 'Монитор найден',
//   })
//   @ApiNotFoundResponse({
//     description: 'Монитор не найден',
//   })
//   findOne(@Param('id') id: string) {
//     return this.monitorService.findOne(id)
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Удалить монитор' })
//   @ApiParam({
//     name: 'id',
//     description: 'ID монитора',
//     example: 'c8f2e3a1-5d6b-4a9b-9e4a-123456789abc',
//   })
//   @ApiOkResponse({
//     description: 'Монитор успешно удалён',
//   })
//   @ApiNotFoundResponse({
//     description: 'Монитор не найден',
//   })
//   remove(@Param('id') id: string) {
//     return this.monitorService.remove(id)
//   }

//   @Get(':id/export-csv')
//   async downloadCsv(@Param('id') id: string, @Res() res: Response) {
//     const csv = await this.monitorService.exportToCsv(id);

//     // Устанавливаем заголовки для скачивания файла
//     res.header('Content-Type', 'text/csv; charset=utf-8');
//     res.attachment(`monitor-report-${id}.csv`); // Имя файла
    
//     // Добавляем BOM для корректного отображения кириллицы в Excel
//     return res.send('\uFEFF' + csv);
//   }
// }
import { Controller, Post, Get, Body, Delete, Param, Res, Query } from '@nestjs/common'
import { Response } from 'express'
import { MonitorService } from './monitor.service.js'
import { CreateMonitorDto } from './dto/create-monitor.dto.js'

import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiProduces,
  ApiQuery, // Добавили этот декоратор
} from '@nestjs/swagger'

@ApiTags('Monitors')
@Controller('monitors')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый монитор' })
  @ApiBody({ type: CreateMonitorDto })
  @ApiCreatedResponse({ description: 'Монитор успешно создан' })
  create(@Body() dto: CreateMonitorDto) {
    return this.monitorService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех мониторов' })
  @ApiOkResponse({ description: 'Список мониторов успешно получен' })
  findAll() {
    return this.monitorService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить монитор по ID с фильтрацией истории' })
  @ApiParam({
    name: 'id',
    description: 'ID монитора',
    example: 'c8f2e3a1-5d6b-4a9b-9e4a-123456789abc',
  })
  @ApiQuery({ name: 'period', required: false, enum: ['24h', '7d', '30d'], description: 'Период истории' })
  @ApiOkResponse({ description: 'Монитор найден' })
  @ApiNotFoundResponse({ description: 'Монитор не найден' })
  findOne(@Param('id') id: string,
  @Query('period') period: string = '24h') {
    return this.monitorService.findOne(id, period)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить монитор' })
  @ApiParam({
    name: 'id',
    description: 'ID монитора',
    example: 'c8f2e3a1-5d6b-4a9b-9e4a-123456789abc',
  })
  @ApiOkResponse({ description: 'Монитор успешно удалён' })
  @ApiNotFoundResponse({ description: 'Монитор не найден' })
  remove(@Param('id') id: string) {
    return this.monitorService.remove(id)
  }

  // --- Эндпоинт экспорта со Swagger документацией ---
  @Get(':id/export-csv')
  @ApiOperation({ summary: 'Экспорт истории проверок в CSV файл' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID монитора для выгрузки истории',
    example: 'c8f2e3a1-5d6b-4a9b-9e4a-123456789abc'
  })
  @ApiProduces('text/csv') // Указываем тип контента, который генерирует эндпоинт
  @ApiOkResponse({
    description: 'CSV файл с историей проверок',
    schema: {
      type: 'string',
      format: 'binary', // Это заставит Swagger UI показать кнопку скачивания
    },
  })
  @ApiNotFoundResponse({ description: 'Монитор не найден' })
  async downloadCsv(@Param('id') id: string, @Res() res: Response) {
    const csv = await this.monitorService.exportToCsv(id);

    // Устанавливаем заголовки для скачивания файла
    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment(`monitor-report-${id}.csv`); 
    
    // Добавляем BOM для корректного отображения кириллицы в Excel
    return res.send('\uFEFF' + csv);
  }
}