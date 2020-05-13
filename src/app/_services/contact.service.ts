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
         
        }
        getContacts(){
            this.apiService.send({
                method:"contact/get",
                status:'new',
                "per-page":20
            })
        }
        searchContact(item){
            this.apiService.send({
                method:"contact/search",
                "s":item
            })
        }
        getRequestContact(){
            this.apiService.send({
                method:"contact/get-requests",
                status:"new"
            })
        }
        addContactToList(id){
            this.apiService.send({
                method:"contact/add",
                id:id
            })
        }
        acceptContactToList(){
            this.apiService.send({
                method:"contact/accept",
                id:5
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
                id:5
            })
        }
}