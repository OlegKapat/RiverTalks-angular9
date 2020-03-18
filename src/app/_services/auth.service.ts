import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../_models';
import {ApiService} from './api.service';
import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public loaderS: Subject<boolean>;
  public loader: boolean = true;
  public currentUserS: Subject<User>;
  public currentUser: User;
  public lastErrorS: Subject<String>;
  public lastError: String;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public translate: TranslateService
  ) {
    this.loaderS = new Subject<boolean>();
    this.currentUserS = new Subject<User>();
    this.lastErrorS = new Subject<String>();
    this.loaderS.subscribe(loader => {
      this.loader = loader;
      console.log(loader);
    });
    this.apiService.on<any>("user/login").subscribe(data => {
      this.loaderS.next(false);
      this.processUser(data);
    });
    this.apiService.on<any>("user/register").subscribe(data => {
      this.processUser(data);
    });
    this.apiService.on<any>("user/get").subscribe(data => {
      this.processUser(data);
    });
    this.apiService.on<any>("user/logout").subscribe(data => {
      this.currentUserS.next(null);
      localStorage.removeItem('auth_token');
      this.lastErrorS.next(null);
      router.navigate(['/']);
    });
    this.lastErrorS.subscribe(error => {
      this.lastError = error;
      if (error) {
        //router.navigateByUrl(router.url);
      }
    })
    this.currentUserS.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);

      if (user && user.id && this.router.url.split('?')[0] === "/login") {
        router.navigate(['/home'])
      }
    })
    this.apiService.status.subscribe(isConnected => {
      if (isConnected) {
        this.autoLogin();
      }
    });
  }

  processUser(data) {
    if (data.status) {
      this.currentUserS.next(data.user);
      localStorage.setItem('auth_token', data.auth_token);
      this.translate.use(data.user.language);
      this.lastErrorS.next(null);
    } else {
      this.currentUserS.next(null);
      localStorage.removeItem('auth_token');
      this.lastErrorS.next(data.error);
    }
  }

  autoLogin() {
    this.lastErrorS.next(null);
    var authToken = localStorage.getItem('auth_token');
    if (authToken) {
      this.apiService.send({
        method: "user/login",
        auth_token: authToken,
      });
    } else {
      this.loaderS.next(false);
    }
  }

  login(user: User) {
    this.lastErrorS.next(null);
    this.apiService.send({
      method: "user/login",
      login: user.login,
      password: user.password,
    });
  }

  register(user: User) {
    this.lastErrorS.next(null);
    this.apiService.send({
      method: "user/register",
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }

  logout() {
    this.lastErrorS.next(null);
    if (this.currentUser) {
      this.apiService.send({
        method: "user/logout"
      });
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
