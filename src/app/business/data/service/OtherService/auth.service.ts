import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  private isAuthenticated: boolean = false;

  get IsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  checkPassword(password: string): Observable<any>{
    return this.httpClient
      .post<any>('/checkpassword', password);
  }

  loginAuthAdmin(): void{
    this.isAuthenticated = true;
  }

  logoutAdmin(): void {
    this.isAuthenticated = false;
  }
}
