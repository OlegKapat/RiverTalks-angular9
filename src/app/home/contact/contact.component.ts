import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services';
import {Contact} from '../../_models/contact'
import { ContactService } from 'src/app/_services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  allcontacts$:Observable<any[]>;

  constructor(private apiService:ApiService, private contactService:ContactService) { }

  ngOnInit(): void {
   this.contactService.getContacts()
   this.allcontacts$=this.apiService.on("contact/get")
  }
  

}
