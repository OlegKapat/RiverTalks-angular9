import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { GroupprofileComponent } from '../groupprofile/groupprofile.component';

@Component({
  selector: 'app-modalforgroup',
  templateUrl: './modalforgroup.component.html',
  styleUrls: ['./modalforgroup.component.css']
})
export class ModalforgroupComponent implements OnInit {

  constructor(private modalService: NgbModal,public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  viewUserInfo(){
    this.modalService.open(GroupprofileComponent,{ size: 'sm' });
    this.dialog.closeAll()
  }
}
