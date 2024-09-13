import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_URL} from "./base-url.const";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_URL) private baseUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders({'Token': 'token-mattheweb@$'})

    const newRequest = request.clone({
      url: this.baseUrl + request.url,
      headers: headers
    })

    return next.handle(newRequest);
  }
}
