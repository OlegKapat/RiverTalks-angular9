import { Injectable, OnInit } from "@angular/core";
import { ApiService } from './api.service';

@Injectable({
    providedIn:'root'
})
export class GroupService implements OnInit{
    constructor(private apiService:ApiService){}
    ngOnInit(){

    }
    addGroup(){
        this.apiService.send({
            method:"group/new",
            title:"Пока новая",
            alias:"Торговля",
            description:"Как хотите",
            private:false
        })
    }
}