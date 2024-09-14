import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService) { }

  private get getAccessToken(): string{
    return localStorage.getItem('access_token');
  }

  IsAuthenticated(): boolean{
    const token = this.getAccessToken;
    return token && !this.jwtHelper.isTokenExpired(token)
  }

  login$(password: string): Observable<any>{
    return this.httpClient
      .post<any>('/login', password)
      .pipe(
        map( value => (value.result)
        )
      )
  }

  logoutAdmin(): void {
    null
  }
}
