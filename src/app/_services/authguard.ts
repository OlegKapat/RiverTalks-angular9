import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import{Injectable} from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from '.';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate,CanActivateChild{
  constructor(private router:Router, private auth:AuthService ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    if (this.auth.currentUser) {
      // authorised so return true
      return of(true);
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return of(false);
  }
  canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>{
    return this.canActivate(route, state)
}
}
