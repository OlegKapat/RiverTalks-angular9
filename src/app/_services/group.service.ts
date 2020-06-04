import { Injectable, OnInit } from "@angular/core";
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class GroupService implements OnInit{
    constructor(private apiService:ApiService, private http:HttpClient){}
    ngOnInit(){

    }
    addGroup(title:string,alias){
        this.apiService.send({
            method:"group/new",
            title:title,
            alias:alias,
            description:"",
            private:false
        })
    }
    getGroup(id?:number){
     this.apiService.send({
        method:"group/get",
        id:id
       
     })
    }
   getRequest(){
       this.apiService.send({
           method:"contact/get-requests"
       })
   } 
   getMembers(id){
       this.apiService.send({
           method:"group/members",
           id:id
       })
   }
   leaveGroup(id){
       this.apiService.send({
        method:"group/leave",
        id:id
       })
   }
  sendAvatar(image):Observable<any>{
     return this.http.post<any>("https://river-talks.com/file/upload",image)
  }
}