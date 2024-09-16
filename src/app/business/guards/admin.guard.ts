import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../data/service/OtherService/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private routerService: Router,
              private authService: AuthService,
              private jwtHelper: JwtHelperService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getAccessToken;

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.authService.checkToken$().pipe(
        map(result => {
          if (result === true) {
            return true;
          } else {
            this.routerService.navigate(['/auth']);
            return false;
          }
        }),
        catchError(error => {
          this.routerService.navigate(['/auth']);
          return of(false);
        })
      );
    } else {
      this.routerService.navigate(['/auth']);
      return of(false);
    }
  }

}
