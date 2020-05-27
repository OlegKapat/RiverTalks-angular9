import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';
import { FocusService } from 'src/app/_services/focus.service';


import { ContactforshareComponent } from '../contactforshare/contactforshare.component';
import { EditcontactComponent } from '../editcontact/editcontact.component';
import { DeletecontactComponent } from '../deletecontact/deletecontact.component';
import { ActivatedRoute } from '@angular/router';
import { ClearchatComponent } from '../clearchat/clearchat.component';
import { DeletechatComponent } from '../deletechat/deletechat.component';
import { BlockuserComponent } from '../blockuser/blockuser.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit,AfterViewInit {
  user:any;
  color: ThemePalette = 'primary';
  allmessages$:Observable<any>;
  disabled = false;
  checked=true;
  userId:number;
  messageId:number;
  constructor(private apiService:ApiService, public activeModal:NgbActiveModal, 
             private userService:UserService,private modalService: NgbModal,
             private focusService:FocusService) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.apiService.on('user/get').subscribe(data=>{this.user=data},error=>console.log(error));
  }
  ngAfterViewInit(){
  
  }
  close(){
    this.activeModal.dismiss()
  }
  sendMessage(){
   //this.focusService.getFocus('')
   this.activeModal.dismiss()
  }
  shareContact(){
      this.modalService.open(ContactforshareComponent, { size: 'md' })
  }
  editContact(){
    this.modalService.open(EditcontactComponent, { size: 'md' })
  }
  deleteContact(){
    this.modalService.open(DeletecontactComponent,{ size: 'sm' })
  }
  clearHistory(){
    this.modalService.open(ClearchatComponent,{ size: 'sm' })
  }
  deleteChat(){
    this.modalService.open(DeletechatComponent,{ size: 'sm' })
  }
  blockContact(){
    this.modalService.open(BlockuserComponent,{ size: 'sm' })
  }
}
