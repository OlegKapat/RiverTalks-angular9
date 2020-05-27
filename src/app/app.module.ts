import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AlertComponent} from './_components';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RestorePasswordComponent} from './restore-password/restore-password.component';
import {ApiModule} from './_services/api.module';
import {environment} from '../environments/environment';
import {LogoutComponent} from './logout/logout.component';
import {PageComponent} from './page/page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

import { MessagesComponent } from './home/messages/messages.component';
import { ContactComponent } from './home/contact/contact.component';
import {SearchPipe} from './_services/shared/pipes/search.pipe';
import { GroupComponent } from './home/group/group.component';
import { LeftSideCardComponent } from './home/left-side-card/left-side-card.component';
import { RefDirective } from './_services/shared/directives/ref.directive';
import { ModalComponent } from './_services/shared/modals/modal/modal.component';
import { AlertModule } from './_components/alertwindow/alert.module';
import { ModalModule } from './_services/shared/modals/modal.module';
import { MaterialModule } from './_services/shared/material/material.module';


const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RestorePasswordComponent,
    LogoutComponent,
    PageComponent,
    LanguageSwitcherComponent,
    MessagesComponent,
    ContactComponent,
    GroupComponent,
    LeftSideCardComponent,
    RefDirective
   
                 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    MaterialModule, 
    HttpClientModule,
    NgbModule, 
    AlertModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: false,
    }),
    ApiModule.config({
      url: environment.wss
    }),
    BrowserAnimationsModule,

  ],
  
  exports:[],
  providers: [SearchPipe],
  bootstrap: [AppComponent],
  entryComponents: [PageComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}
