import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-editusername',
  templateUrl: './editusername.component.html',
  styleUrls: ['./editusername.component.css']
})
export class EditusernameComponent implements OnInit {
  @ViewChild('name') name:ElementRef;
  @ViewChild('last') last:ElementRef;
  constructor(public activeModal: NgbActiveModal,private userService:UserService) { }

  ngOnInit(): void {
  }
  editName(name){
    this.userService.userUpdate(name)
  }
}
