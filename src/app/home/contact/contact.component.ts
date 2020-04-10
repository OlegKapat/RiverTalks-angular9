import { Component, OnInit, Input } from '@angular/core';
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
  @Input()searchfield:string;
  allcontacts$:Observable<any[]>;
  contactform:any[]=[]
  initialAvatarImage:string;
  initialAvatarText:string;


  constructor(private apiService:ApiService, private contactService:ContactService) { }

  ngOnInit(): void {
   this.contactService.getContacts()
   this.allcontacts$=this.apiService.on("contact/get")
  //  this.contactService.addContactToList();
  //  this.apiService.on<Contact[]>('contact/add')
  
   this.allcontacts$.subscribe(data=>{this.contactform=[...data['contacts']],console.log(this.contactform);
     
    if(this.contactform){
      this.contactform.forEach(value=>{   
        if(value['user']['avatar']['file']['url'] ==""){
          this.transformAvatar(value['user']['name'])
        }
        else{
          this.initialAvatarImage=value['user']['avatar']['file']['url'] 
        }
      })
    }
   })
  }
  transformAvatar(name:string):string{
    var str=name.split(' ');
    var first='';
    var second='';
     if(str[0]!==""){
      first=str[0].charAt(0).toUpperCase()
    }
     else if(str[1]!=="undefined"){
      second=str[1].charAt(0).toUpperCase() 
    }
       return this.initialAvatarText = first+second || "U"
  }
  getAllMessage(id){

  }
}
