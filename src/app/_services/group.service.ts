import { Injectable, OnInit } from "@angular/core";
import { ApiService } from './api.service';

@Injectable({
    providedIn:'root'
})
export class GroupService implements OnInit{
    constructor(private apiService:ApiService){}
    ngOnInit(){

    }
    addGroup(title:string){
        this.apiService.send({
            method:"group/new",
            title:title,
            alias:"School",
            description:"Как хотите",
            private:false
        })
    }
    getGroup(){
     this.apiService.send({
        method:"group/get",
       
     })
    }
}