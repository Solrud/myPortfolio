import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../../../app.constant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient,
              @Inject(BASE_URL) private baseUrl: InjectionToken<string>) { }

  private isAuthenticated: boolean = false;

  get IsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  checkPassword(password: string): Observable<any>{
    return this.httpClient
      .post<any>(this.baseUrl + '/checkpassword', password);
  }

  loginAuthAdmin(): void{
    this.isAuthenticated = true;
  }

  logoutAdmin(): void {
    this.isAuthenticated = false;
  }
}
