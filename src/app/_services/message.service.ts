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
  
    sendMessage(data){
      // this.lastErrorS.next(null)
      // this.messageTo$.next(data);  
        this.apiService.send({
            method:"message/send",
            text:data,
            to:1,
            attachments:""
            
        })   
    }
    getMessage(){
      this.apiService.send({
        method:"message/get",
        from:1,
        status:'new',
        id:'',
        "min-id":1,
        "with-own":true,
        updated:"21312432",
        "per-page":"10"
      
      })
    }
    updateMessage(){
      this.apiService.send({
        method:"message/update",
        id:1,
        text:"",
        attachments:''
      })
    }
    deleteMessage(){
      this.apiService.send({
        method:"message/del",
        id:1,
      })
    }
    getChatMessage(){
      this.apiService.send({
        method:"chat/get",
        
      })
    }
    chatDelete(){
      this.apiService.send({
        method:"chat/del",
        id:1
      })
    }
}