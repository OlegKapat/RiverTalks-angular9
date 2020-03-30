import { ApiService } from './../_services/api.service';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from "../_services";
import {MatDialog} from "@angular/material/dialog";
import {ThemePalette} from '@angular/material/core';
import {PageComponent} from "../page";
import { Message } from '../_models/message';
import { WS } from '../_models/websocket.events';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   opened=false;
   informed=false;
   disabled = false;
   checked=true;
   show=false;
   alluser:[]=[];
   messageContent:string;
   messageList:string[] = [];
   color: ThemePalette = 'primary';
   @ViewChild('text') inputmesssage:ElementRef;
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private apiservice:ApiService,
  ) {

  }

  ngOnInit(): void {
     this.apiservice.on<any>("user/get").subscribe((res)=>this.alluser=res)
     this.apiservice.on<Message[]>(WS.ON.MESSAGES)
     .subscribe((messages: Message[]) => {
         console.log(messages);

         this.apiservice.send('text');
     });
  }
 showArray(){
  this.show=!this.show
 }
 sendMessage(message:string){
   if(!message){
     return
   }
   else{
    this.messageList.push(message)
    this.apiservice.send(message)
    this.inputmesssage.nativeElement.value='';
    this.show=false;
   }

 }
}

