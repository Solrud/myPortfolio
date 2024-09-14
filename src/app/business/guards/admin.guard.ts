import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../data/service/OtherService/auth.service";
import {environment} from "../../../environment/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private routerService: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.IsAuthenticated() || !environment.production)
      return true;

    this.routerService.navigate(['/auth']);
    return false;

  //   if (!this.authService.IsAuthenticated && environment.production){
  //     this.routerService.navigate(['/auth']);
  //     return false
  //   }
  //   return true;
  }

}
