import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { delay } from "rxjs/operators";

@Injectable()
export class DevTimeDelayTestingInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isDevMode() && !request.url.includes('api/authenticate') && !request.url.includes('api/account')) {
      return next.handle(request).pipe(
        delay(1000)
      );
    } else {
      return next.handle(request);
    }

  }
}
