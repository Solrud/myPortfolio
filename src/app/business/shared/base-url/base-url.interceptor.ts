import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_URL} from "./base-url.const";
import {AuthService} from "../../data/service/OtherService/auth.service";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_URL) private baseUrl: string,
              private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessToken = this.authService.getAccessToken?.trim();
    const headers =
      new HttpHeaders(
        {
          'Token': 'token-mattheweb@$',
          'Authorization': 'Bearer ' + accessToken
        },
      )

    const newRequest = request.clone({
      url: this.baseUrl + request.url,
      headers: headers
    })

    return next.handle(newRequest);
  }
}
