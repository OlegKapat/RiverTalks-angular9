import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {MatButton, MatButtonModule} from "@angular/material/button";
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { MatSliderModule } from '@angular/material/slider';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MessagesComponent } from './home/messages/messages.component';
import { ContactComponent } from './home/contact/contact.component';
import {SearchPipe} from './_services/shared/pipes/search.pipe';
import { GroupComponent } from './home/group/group.component';
import { LeftSideCardComponent } from './home/left-side-card/left-side-card.component';


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
    SearchPipe,
    GroupComponent,
    LeftSideCardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
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

    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,

  ],

  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PageComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}
