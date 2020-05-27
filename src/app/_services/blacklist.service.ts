import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  constructor(private apiService:ApiService) { }

  blockContact(id){
    this.apiService.send({
        method:"blacklist/add",
        id:id
    })
}
}
