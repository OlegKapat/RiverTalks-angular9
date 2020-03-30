import { Injectable,OnInit } from "@angular/core";
import { ApiService } from './api.service';
import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Message} from '../_models/message'

@Injectable({
    providedIn:'root'
})

export class MessageService implements OnInit{
    constructor(private apiService:ApiService){
        this.apiService.on<any>("message/send").subscribe(data=>{
            console.log(data);
            
        })
        this.apiService.on<any>('message/recieve').subscribe(data=>{})
      
    }
    ngOnInit(){

    }
    sendMessage(data:Message){
        this.apiService.send({
            from:data.from,
            context:data.content
        })
    }
}