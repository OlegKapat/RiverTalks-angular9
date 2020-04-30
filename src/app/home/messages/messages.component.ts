import { Component, OnInit, AfterViewInit, Input, Output,EventEmitter, ViewChild,ComponentFactoryResolver, OnDestroy} from '@angular/core';
import { MessageService, ApiService } from 'src/app/_services';

import {Message} from "../../_models/message"
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModalComponent } from '../../_services/shared/modals/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import { RefDirective } from 'src/app/_services/shared/directives/ref.directive';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  
})
export class MessagesComponent implements OnInit,AfterViewInit,OnDestroy{
   allmessages$:Observable<any>;
   arrayText:Message[]=[];
   userId:number;
   messageId:number;
   messageObject={}
   aSub:Subscription;
   currentMessage:string
   @Input() messagefrom;
   @Input() messagetext:string;
   @Output() messageText=new EventEmitter<string>();
 


  constructor(private messageService:MessageService, private apiService:ApiService,private router:Router,
              private route:ActivatedRoute, private resolver:ComponentFactoryResolver, public dialog:MatDialog,
             
             ) {}
              
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['edit']){
        this.messageText.emit(this.currentMessage);
      }
    })
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe(params=>{this.userId=+params['userId']
    this.messageService.getMessage(this.userId);
    })
    this.allmessages$=this.apiService.on<Message[]>('message/get');
   
  }
  
  public removeText(index: number): void {
    this.apiService.send("message/del");
}

  getMessage(messageId,event,text){
    this.currentMessage=text;
       let dialogRef=this.dialog.open(ModalComponent)
      // dialogRef.afterClosed().subscribe()
       if(event){
        event.preventDefault();
          this.router.navigate(['/home'],{queryParams:{
            messageId:messageId
          },
           queryParamsHandling: 'merge',
        })
       }
       sessionStorage.setItem("copy",text)
  
  }
  messageToTransform(){
    this.apiService.on<Message[]>('message/get').subscribe(data=>{this.arrayText=data['messages']
    if(this.arrayText){
        this.arrayText.forEach(element=>{
         if(element['status_text']==='new'){
            // this.messageService.updateMessage('updated')  при оптимизации бэкенда открыть
            // this.apiService.on<Message[]>('message/update');
         }
         
        } 
        )
    }
  },error=>console.log(error)
  )  
  }
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }
}
