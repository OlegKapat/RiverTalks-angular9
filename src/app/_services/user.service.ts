import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }

  getUser(){
    this.apiService.send({
        method:"user/get",
        
    })
}
  searchUser(item){
    this.apiService.send({
        method:"user/search",
        "s":item
    })
}
  userGetById(id){
  this.apiService.send({
   method: "user/get",
   id:id
  })
}
userUpdate(name){
  this.apiService.send({
    method:"user/update",
    name:name
  
  })
}
mailUpdate(mail){
  this.apiService.send({
    method:"user/update",
    email:mail
  
  })
}
phoneUpdate(phone){
  this.apiService.send({
    method:"user/update",
    phone:phone
  
  })
}
}
