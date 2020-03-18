import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services";

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {
    this.authService.logout();
  }

  ngOnInit(): void {
    console.log(2);
  }

}
