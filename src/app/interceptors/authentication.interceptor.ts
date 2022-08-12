import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    } as { [key: string]: string }
    
    if (this.authService.isAuthenticated())
      headers['Authorization'] = `Bearer ${this.authService.getToken()}`

    request = request.clone({ setHeaders: headers })
    return next.handle(request);
  }
}
