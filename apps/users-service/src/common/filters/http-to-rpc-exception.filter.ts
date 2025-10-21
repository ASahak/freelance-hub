import { Catch, HttpException } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class HttpToRpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: HttpException): Observable<any> {
    const response = exception.getResponse();
    const status = exception.getStatus();

    return throwError(
      () =>
        new RpcException({
          status,
          message: (response as any).message || response,
          error: (response as any).error,
        }),
    );
  }
}
