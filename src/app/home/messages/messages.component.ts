import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService, ApiService } from 'src/app/_services';
import {Message} from "../../_models/message"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit,AfterViewInit {

   texts$: Observable<Message[]>;
   arrayText:Message[];
  constructor(private messageService:MessageService, private apiService:ApiService) { }

  ngOnInit(): void {
    this.messageService.getMessage()
    this.texts$=this.apiService.on<Message[]>('message/get')
  }
  ngAfterViewInit(){
   if(window.top.opener || window.top.onresize){
     this.texts$.subscribe(data=>{this.arrayText=data
      this.arrayText.forEach(element => {
        if(element[status]=="new")
         {
           // как то перезаписваем на сервере
         }
        
      });
    }
     )
   }

   
  }
  public removeText(index: number): void {
    this.apiService.send("message/del");
}
getMessage(event){

}
}
