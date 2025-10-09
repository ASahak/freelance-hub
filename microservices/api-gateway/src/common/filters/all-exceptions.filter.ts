import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    let responseBody: {
      statusCode: number
      message: string
      error: string
    }
    if (exception instanceof HttpException) {
      const response = exception.getResponse()
      const errorName =
        typeof response === 'string'
          ? response
          : (response as any).error || 'Error'
      const message = (response as any).message || response

      responseBody = {
        statusCode: httpStatus,
        message: Array.isArray(message) ? message.join(', ') : message,
        error: errorName
      }
    } else {
      // For non-HttpExceptions (like a database crash)
      responseBody = {
        statusCode: httpStatus,
        message: 'An internal server error occurred.',
        error: 'Internal Server Error'
      }
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
