import { ApiService } from './../_services/api.service';
import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output} from '@angular/core';
import {AuthService, MessageService} from "../_services";
import {MatDialog} from "@angular/material/dialog";
import {ThemePalette} from '@angular/material/core';
import {PageComponent} from "../page";
import { Message} from '../_models/message';
import { Events } from '../_models/websocket.events';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 
})
export class HomeComponent implements OnInit,AfterViewInit {
   opened=false;
   informed=false;
   disabled = false;
   checked=true;
   show=false;
   searchfield="";
   messageContent="";
   currentId:number;
   messageList:string[] = [];
   color: ThemePalette = 'primary';
   @ViewChild('text') inputmesssage:ElementRef;
 
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private apiservice:ApiService,
    private messageService:MessageService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    //  this.apiservice.on<any>("user/get").subscribe((res)=>this.alluser=res)
    //  this.apiservice.on<Message[]>(WS.ON.MESSAGES)
    //  .subscribe((messages: Message[]) => {
    //      console.log(messages);

    //      this.apiservice.send('text');
    //  });
  
  
  }
  ngAfterViewInit(){
    
  }
 showArray(){
  this.show=!this.show
 }
 sendMessage(message){
   if(!message){
     return
   }
   else{
   this.route.queryParams.subscribe(params=>{this.currentId=+params['userId']
   this.messageService.sendMessage(message,this.currentId);
   this.apiservice.on<any>('message/send')
  })
   this.inputmesssage.nativeElement.value='';
   this.show=false;
   }
  
 }
 
}

