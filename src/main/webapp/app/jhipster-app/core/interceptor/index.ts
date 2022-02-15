import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from 'app/jhipster-app/core/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from 'app/jhipster-app/core/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'app/jhipster-app/core/interceptor/error-handler.interceptor';
import { NotificationInterceptor } from 'app/jhipster-app/core/interceptor/notification.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NotificationInterceptor,
    multi: true,
  },
];
