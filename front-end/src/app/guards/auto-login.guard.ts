import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private userService: UserService,private authService: AuthenticationService, private router: Router) { }
  
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !==null),
      take(1),
      map(isAuthenticated => {
        if(isAuthenticated){
          this.router.navigateByUrl('/tabs-menu',{replaceUrl: true});
        }else{
          return true;
        }
    
      })

    )
  }
}
