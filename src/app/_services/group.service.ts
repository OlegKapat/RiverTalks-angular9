import { Injectable, OnInit } from "@angular/core";
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractFormGroupDirective } from '@angular/forms';

@Injectable({
    providedIn:'root'
})
export class GroupService implements OnInit{
    constructor(private apiService:ApiService, private http:HttpClient){}
    ngOnInit(){

    }
    addGroup(title,alias){
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
   delGroup(id){
        this.apiService.send({
          method:"group/del",
          id:id
        })
   }

  sendAvatar(image:File,type:string):Observable<any>{
    const formData = new FormData();
    formData.append('file', image);
    formData.append('session',localStorage.getItem('auth_token'));
    formData.append('type',type)
     return this.http.post<any>("https://river-talks.com/file/upload",formData)
  }
    updateGroup(id,title,description){
        this.apiService.send({
            method:"group/update",
            id:id,
            title:title,
            description:description

        })
    }
    inviteGroup(userId,groupId){
        this.apiService.send({
            method:"group/invite",
            id:groupId,
            user_id:userId
        })
    }
    kickUser(groupId,userId){
        this.apiService.send({
            method:"group/kick",
            id:groupId,
            user_id:userId
        })
    }
    banUser(groupId,userId){
        this.apiService.send({
            method:"group/ban",
            id:groupId,
            user_id:userId
        })
    }
    unbanUser(groupId,userId){
        this.apiService.send({
            method:"group/unban",
            id:groupId,
            user_id:userId
        })
    }
}