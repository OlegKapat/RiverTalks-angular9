import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

  constructor(private apiService:ApiService) { }

  getFile(id?:number){
    this.apiService.send({
     method:"file/get",
     id:id
    })
  }
  delFile(id?:number){
    this.apiService.send({
     method:"file/del",
     id:id
    })
  }
}
