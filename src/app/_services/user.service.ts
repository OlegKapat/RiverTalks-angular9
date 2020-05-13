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
}
