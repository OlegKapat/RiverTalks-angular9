import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarserviceService {

  constructor(private apiService:ApiService) { }

  setAvatarForGroup(groupid,fileid){
    this.apiService.send({
        method:"avatar/set",
        file_id:fileid,
        group_id:groupid
       })
  }
  getAvatar(id?:number){
   this.apiService.send({
        method:"avatar/get",
        group_id:id
       })
  }
}
