import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // Ловим абсолютно всё
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Определяем статус: если это HttpException — берем его код, иначе 500
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Формируем сообщение
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Логируем ошибку для разработчика
    this.logger.error(
      `Http Status: ${status} Error: ${JSON.stringify(message)} Path: ${request.url}`,
    );

    // Отправляем красивый JSON на фронтенд
    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // Если message — это объект (от Nest validation), разворачиваем его
      error: typeof message === 'object' ? message : { message },
    });
  }
}
