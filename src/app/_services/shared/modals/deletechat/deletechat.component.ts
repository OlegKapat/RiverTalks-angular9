import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { ContactService } from 'src/app/_services/contact.service';
import { UserService } from 'src/app/_services/user.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-deletechat',
  templateUrl: './deletechat.component.html',
  styleUrls: ['./deletechat.component.css']
})
export class DeletechatComponent implements OnInit,AfterViewInit {
  userId:number;
  user:any;
  forAnotherUser:false
  constructor(public activeModal:NgbActiveModal, private route:ActivatedRoute,
               private contactService:ContactService, private apiService:ApiService,
               private userService:UserService, private messageService:MessageService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:Params)=>this.userId=+params['userId']);
    this.userService.userGetById(this.userId)
    this.apiService.on('user/get').subscribe(data=>{this.user=data['user']['name']})

  }
  deleteChat(){
    this.messageService.chatDelete(this.userId)
  }
}
