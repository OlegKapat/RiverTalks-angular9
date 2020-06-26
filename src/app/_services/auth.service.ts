import {Injectable, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {User} from '../_models';
import {ApiService} from './api.service';
import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  public loaderS: Subject<boolean>;
  public loader: boolean = true;
  private token=null;
  private authToken$:Subject<boolean>
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
    this.apiService.on<any>("user/login").subscribe(data =>{
      this.loaderS.next(false);
      this.processUser(data);
    });
    this.apiService.on<any>("user/sms").subscribe(data=>{
      this.processUser(data)
    })
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
      this.router.navigate(['/']);
    });
    this.lastErrorS.subscribe(error => {
      this.lastError = error;
      if (error) {
        //router.navigateByUrl(router.url);
      }
    })
    this.currentUserS.subscribe(user => {
      this.currentUser = user
      
      if (user) {
        this.router.navigate(['/home'])
      }
      //&& user.id && this.router.url.split('?')[0] === "/login"
    })

    this.apiService.status.subscribe(isConnected => {
      if (isConnected) {
        this.autoLogin();
      }
    });
  }
  ngOnInit(){

  }
  setToken(token:string){
     this.token=token;
  }
  
  processUser(data) {
    if (data.status) {
      this.currentUserS.next(data.user);
      localStorage.setItem('auth_token', data.auth_token);
      this.setToken(data.auth_token)
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

 isAuthenticated(){
    if(this.token){
      this.authToken$.next(true)
    }
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
  loginWithPnone(phone){
    this.apiService.send({
      method:"user/login",
      phone:phone
    })
  }
  sendSms(code){
    this.apiService.send({
      method:"user/sms",
      code:code
    })
  }
  logout() {
    this.lastErrorS.next(null);
    if (this.currentUser) {
      this.apiService.send({
        method: "user/logout"
      });
    }
  }



}
