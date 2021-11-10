import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter,map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthActiveGuardGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isAuthenticated.pipe(
        filter(val => val !==null),
        take(1),
        map(isAuthenticated => {
          console.log('GUARD', isAuthenticated);
          if (isAuthenticated){
            return true;
          }else{
            this.router.navigateByUrl('/login')
            return false;
          }
        })
      )
  }
  
}
