import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { GroupprofileComponent } from '../groupprofile/groupprofile.component';
import { LeavegroupComponent } from '../leavegroup/leavegroup.component';
import { CleargroupchatComponent } from '../cleargroupchat/cleargroupchat.component';

@Component({
  selector: 'app-modalforgroup',
  templateUrl: './modalforgroup.component.html',
  styleUrls: ['./modalforgroup.component.css']
})
export class ModalforgroupComponent implements OnInit {
  owner:boolean=true;
  constructor(private modalService: NgbModal,public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  viewUserInfo(){
    this.modalService.open(GroupprofileComponent,{ size: 'sm' });
    this.dialog.closeAll()
  }
  leaveGroup(){
    this.modalService.open(LeavegroupComponent,{ size: 'sm' });
    this.dialog.closeAll();
  }
  deleteHistory(){
    this.modalService.open(CleargroupchatComponent,{ size: 'sm' });
    this.dialog.closeAll();  
 }
  deleteGroup(){

  }
}
