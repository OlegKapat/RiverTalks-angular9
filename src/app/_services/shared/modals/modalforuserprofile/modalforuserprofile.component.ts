import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { UserprofileComponent } from '../userprofile/userprofile.component';

@Component({
  selector: 'app-modalforuserprofile',
  templateUrl: './modalforuserprofile.component.html',
  styleUrls: ['./modalforuserprofile.component.css']
})
export class ModalforuserprofileComponent implements OnInit {

  constructor(private modalService: NgbModal,public dialog:MatDialog) { }
  ngOnInit(): void {
  }
  showUserProfile(){
     this.dialog.closeAll()
     this.modalService.open( UserprofileComponent,{ size: 'sm' })
  }
}
