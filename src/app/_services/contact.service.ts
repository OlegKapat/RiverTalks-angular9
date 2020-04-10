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
                status:'new',
                "per-page":20
            })
        }
        searchContact(){
            this.apiService.send({
                method:"contact/search",
                "s":"serch"
            })
        }
        getRequestContact(){
            this.apiService.send({
                method:"contact/get-requests",
                status:"new"
            })
        }
        addContactToList(){
            this.apiService.send({
                method:"contact/add",
                id:5
            })
        }
        acceptContactToList(){
            this.apiService.send({
                method:"contact/accept",
                id:1
            })
        }
        rejectContact(){
            this.apiService.send({
                method:"contact/reject",
                id:1
            })
        }
        deleteContact(){
            this.apiService.send({
                method:"contact/del",
                id:1
            })
        }
}