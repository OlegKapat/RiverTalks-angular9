import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user:any;
  constructor(private modalService: NgbModal, private apiService:ApiService, 
             private userService:UserService, private authService:AuthService,
             public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.apiService.on('user/get').subscribe(data=>{this.user=data},error=>console.log(error))
  }
  close(){
    this.authService.logout()
  }
  closeModal(){
    this.activeModal.dismiss()
  }
  editProfile(){
    this.modalService.open(EditprofileComponent, { size: 'sm',centered: true  } )
    this.activeModal.dismiss()
  }
}
