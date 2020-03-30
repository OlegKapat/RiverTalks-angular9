import { Component, OnInit } from '@angular/core';
import {ApiService, AuthService} from "./_services";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';

  constructor(
    public translate: TranslateService,
    public authService: AuthService,
    public apiService: ApiService,
    public router: Router
  ) {
    this.translate.addLangs(['en', 'ru', 'uk']);
    this.translate.setDefaultLang('ru');
    this.translate.onLangChange.subscribe(lang => {
      localStorage.setItem('currentLang', this.translate.currentLang)
    });
    var currentLang = localStorage.getItem('currentLang');
    this.translate.use(currentLang ? currentLang : this.translate.defaultLang);
    this.router.events.subscribe((val) => {
      this.authService.lastErrorS.next(null);
    });

  }
  ngOnInit(){
      this.apiService.status.subscribe(isConnected => {

      if (isConnected) {
        this.apiService.send({
          "method": "language",
          "language": this.translate.currentLang
        });
      }
    });
  }

}
