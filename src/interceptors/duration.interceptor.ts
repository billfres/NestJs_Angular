import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Our first interceptor');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Réponse rèçu après : ${Date.now() - now}ms`)),
      );
  }
}
