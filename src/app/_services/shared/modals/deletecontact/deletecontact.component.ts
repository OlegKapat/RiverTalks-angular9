import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_services/api.service';

import { ActivatedRoute } from '@angular/router';

import { ContactService } from 'src/app/_services/contact.service';
import { MessageService } from 'src/app/_services/message.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-deletecontact',
  templateUrl: './deletecontact.component.html',
  styleUrls: ['./deletecontact.component.css']
})
export class DeletecontactComponent implements OnInit,AfterViewInit {
   userId:number;
   user:any
  constructor(public activeModal:NgbActiveModal, private apiService:ApiService,
               private contactService:ContactService, private route:ActivatedRoute,
                private messageService:MessageService, private userService:UserService) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe(params=>{this.userId=+params['userId']})
    this.userService.userGetById(this.userId)
    this.apiService.on('user/get').subscribe(data=>{this.user=data['user']['name']
    
      
    })
  }
  deleteContact(){
    this.contactService.deleteContact(this.userId);
    this.messageService.chatDelete(this.userId);
  }
}
