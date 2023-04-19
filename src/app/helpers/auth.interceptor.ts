import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem("username") && sessionStorage.getItem("token")) {
      req = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, '' + sessionStorage.getItem("token"))
      })
    }

    return next.handle(req);

  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];