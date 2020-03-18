import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {RestorePasswordComponent} from './restore-password/';
import {AuthService} from './_services';
import {LogoutComponent} from "./logout";
import {PageComponent} from "./page";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'restore-password', component: RestorePasswordComponent},
  {path:'home',component:HomeComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: 'LoginComponent'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
