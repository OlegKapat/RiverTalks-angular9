import { Injectable,OnInit } from "@angular/core";
import { ApiService } from './api.service';
import {Subject, Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Message} from '../_models/message'
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn:'root'
})

export class MessageService implements OnInit{
    public messageTo$:Subject<Message>;
    public messageTo:Message;
    public lastErrorS: Subject<String>;
    public lastError: String;
    public status:Subject<boolean>;

    
    constructor(private apiService:ApiService,private auth:AuthService, private router:Router){
          this.messageTo$=new Subject<Message>();
          this.lastErrorS = new Subject<String>();
          this.status=new Subject<boolean>();


         this.lastErrorS.subscribe(error => {
            this.lastError = error;
            if (error) {
             this.router.navigateByUrl(router.url);
            }
          })
       
    }
    ngOnInit(){
      
    }
  
    sendMessage(message,id){
      // this.lastErrorS.next(null)
      // this.messageTo$.next(data);  
        this.apiService.send({
            method:"message/send",
            text:message,
            to:id,
            attachments:""
            
        })   
    }
    getMessage(id?:number,messageId?:number){
     return this.apiService.send({
        method:"message/get",
        from:id,
        status:'new,updated',
        id:messageId,
        "min-id":10,
        "with-own":true,
      })
    }
    updateMessage(id?:number,text?:string){
      this.apiService.send({
        method:"message/update",
        id:id,
        text:text,
        attachments:'',
        status_text:status
      })
    }
    deleteMessage(id){
      this.apiService.send({
        method:"message/del",
        id:id,
      })
    }
    receiveMessage(id){
      this.apiService.send({
        method:"message/received",
        id:id
      })
    }
    getChatMessage(){
      this.apiService.send({
        method:"chat/get",
        
      })
    }
    chatDelete(id){
      this.apiService.send({
        method:"chat/del",
        id:id
      })
    }
    sendFile(userId,fileId,type){
      console.log(userId, fileId, type);
      
      this.apiService.send({
        method:"message/send",
        to:userId,
        attachments:[{
        file_id:fileId,
        type:type
        }]
      })
    }
}