import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from '../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
  }

  restorePassword() {
    this.authService.register(this.registerForm.value);
  }

}
