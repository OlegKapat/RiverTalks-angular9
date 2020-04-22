import { Component, OnInit, AfterViewInit, Input, Output,EventEmitter, ViewChild,ComponentFactoryResolver, OnChanges } from '@angular/core';
import { MessageService, ApiService } from 'src/app/_services';
import {Message} from "../../_models/message"
import { Observable,fromEvent } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../_services/shared/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import { RefDirective } from 'src/app/_services/shared/directives/ref.directive';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit,AfterViewInit{
   allmessages$:Observable<any>;
   arrayText:Message[]=[];
   userId:number;
   @Input() messagefrom;
   @Input() messagetext:string;
   @Output() allmessages=new EventEmitter<any[]>();
   @ViewChild(RefDirective)refDir:RefDirective;


  constructor(private messageService:MessageService, private apiService:ApiService,private router:Router,
              private route:ActivatedRoute, private resolver:ComponentFactoryResolver, public dialog:MatDialog) {}
              
 

  ngOnInit(): void {
    
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
  getMessage(messageId,event){
       let dialogRef=this.dialog.open(ModalComponent)
       dialogRef.afterClosed().subscribe(result=>console.log(result))
       if(event){
        event.preventDefault();
          this.router.navigate(['/home'],{queryParams:{
            messageId:messageId
          },
           queryParamsHandling: 'merge',
        })
       }
       
       
    //  const modalWindow=this.resolver.resolveComponentFactory(ModalComponent)
    //  this.refDir.containerRef.clear();
    //  this.refDir.containerRef.createComponent(modalWindow)
  }
  messageToTransform(){
    this.apiService.on<Message[]>('message/get').subscribe(data=>{this.arrayText=data['messages']
    if(this.arrayText){
        this.arrayText.forEach(element=>{
         if(element['status_text']==='new'){
            this.messageService.updateMessage('updated')
            this.apiService.on<Message[]>('message/update');
         }
         
        } 
        )
    }
  },error=>console.log(error)
  )
      
    
     
  }
}
