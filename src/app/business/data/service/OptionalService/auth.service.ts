import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  get IsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  loginAuthAdmin(): void{
    this.isAuthenticated = true;
  }

  logoutAdmin(): void {
    this.isAuthenticated = false;
  }
}
