import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'src/app/_services/message.service';
import { UserService } from 'src/app/_services/user.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-clearchat',
  templateUrl: './clearchat.component.html',
  styleUrls: ['./clearchat.component.css']
})
export class ClearchatComponent implements OnInit, AfterViewInit {
  userId:number;
  user:any;
  forAnotherUser:boolean;
  constructor(public activeModal:NgbActiveModal, private route :ActivatedRoute,
              private messageService:MessageService, private userService:UserService,
              private apiService:ApiService  ) { }

  ngOnInit(): void {
    this.forAnotherUser=false;
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:Params)=>{this.userId=params['userId']})
    this.userService.userGetById(this.userId)
    this.apiService.on('user/get').subscribe(data=>{this.user=data['user']['name']})
  }
  deleteChat(){
    this.messageService.chatDelete(this.userId)
  }
}
