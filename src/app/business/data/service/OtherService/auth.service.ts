import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService) { }

  get getAccessToken(): string{
    try{
      const accessToken = localStorage.getItem('access_token');

      return accessToken;
    } catch {
      return null;
    }
  }

  IsAuthenticated(): Observable<boolean>{
    const token = this.getAccessToken;
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.checkToken$().pipe(
        map(result => !!result || false)
      );
    } else {
      return of(false);
    }
  }

  login$(password: string): Observable<any>{
    return this.httpClient
      .post<any>('/login', password)
      .pipe(
        map( value => (value.result)
        )
      )
  }

  checkToken$(): Observable<any>{
    return this.httpClient.get('/check-token');
  }

  logoutAdmin(): void {
    null
  }
}
