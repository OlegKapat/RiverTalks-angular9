import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/_services/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deletemessage',
  templateUrl: './deletemessage.component.html',
  styleUrls: ['./deletemessage.component.css']
})
export class DeletemessageComponent implements OnInit,AfterViewInit {
  messageId:number;
  constructor(public activeModal:NgbActiveModal,private route:ActivatedRoute,
              private messageService:MessageService, private router:Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe(params=>this.messageId=+params['messageId']);
  }
   deleteMessage(){
    this.messageService.deleteMessage(this.messageId);
    this.route.queryParams.subscribe(params=>{
     this.messageService.getMessage(+params['userId'],null)
     //this.messageService.getMessage(+params['groupId'],null)
      })
      this.activeModal.close();
   }
   closeAll(){
     this.activeModal.dismiss() 
     this.router.navigate(['home'],{queryParams:{
     select:undefined
 },  queryParamsHandling: 'merge',})
   }
}
