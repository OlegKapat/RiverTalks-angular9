import { Injectable, OnInit } from "@angular/core";
import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { Contact } from '../_models/contact';

@Injectable({
    providedIn:'root'
})
export class ContactService implements OnInit{
    public contact$:Subject<Contact>;
    public contact:Contact;
    public status$:Subject<boolean>;
    public status:string;

   constructor(private apiService:ApiService){}
   
        ngOnInit(){
          this.getContacts()
        }
        getContacts(){
            this.apiService.send({
                method:"contact/get",
                status:"new"
            })
        }
}