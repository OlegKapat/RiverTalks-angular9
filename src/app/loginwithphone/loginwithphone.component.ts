import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService, AuthService } from '../_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditprofileComponent } from '../_services/shared/modals/editprofile/editprofile.component';

@Component({
  selector: 'app-loginwithphone',
  templateUrl: './loginwithphone.component.html',
  styleUrls: ['./loginwithphone.component.css']
})
export class LoginwithphoneComponent implements OnInit {
  @ViewChild("phonenumber") number:ElementRef;
  @ViewChild("code") code:ElementRef;
  isCode:boolean=false;
  constructor(private apiService:ApiService, private authService:AuthService,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
   sendRequestForCode(){
    this.authService.loginWithPnone(this.number.nativeElement.value)
    this.isCode=true;
   }
   sendCode(){
    this.authService.sendSms(this.code.nativeElement.value);
    this.modalService.open(EditprofileComponent,{size:"sm"})

   }
}
