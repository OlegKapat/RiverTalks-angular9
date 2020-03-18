import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ApiService, AuthService} from "./../_services";

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public authService: AuthService,
    public apiService: ApiService
  ) {
  }

  ngOnInit(): void {
  }

  switchLang(language: string) {
    this.authService.lastErrorS.next(null);
    this.translate.use(language);
    this.apiService.send({
      "method": "language",
      "language": this.translate.currentLang
    });
  }

}
