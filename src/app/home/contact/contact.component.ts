import { Component, OnInit, Input, AfterViewInit, Output,EventEmitter } from '@angular/core';
import { ApiService, MessageService } from 'src/app/_services';
import {Contact} from '../../_models/contact'
import { ContactService } from 'src/app/_services/contact.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



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
  newcontactform:any[]=[];
  selectedIndex: number = null;


  constructor(private apiService:ApiService, private contactService:ContactService, private router:Router ) { }

  ngOnInit(): void {
   this.contactService.getContacts()
   this.allcontacts$=this.apiService.on("contact/get")
  //  this.contactService.addContactToList();
  //  this.apiService.on<Contact[]>('contact/add')
  // this.contactService.deleteContact(); 
  // this.apiService.on<Contact>('contact/del')
  // this.contactService.acceptContactToList()
  // this.apiService.on<Contact>('contact/accept')
  
   this.allcontacts$.subscribe(data=>{this.contactform=[...data['contacts']]
   
    if(this.contactform){
      this.contactform.forEach(value=>{   
        if(value['user']['avatar']['file']['url'] ==""){
         value.sign= this.transformAvatar(value['user']['name'])
        }
        else{
          this.initialAvatarImage=value['user']['avatar']['file']['url'] 
        }
      })
    }
   })
   
  }
  setIndex(index: number) {
    this.selectedIndex = index;
 }
  transformAvatar(name:string):string{
    var str=name.split(' ');
    var first='';
    var second='';
     switch(str.length){
       case 1:first=str[0][0].toUpperCase();
       break;
       case 2:first=str[0][0].toUpperCase(),second=str[1][0].toUpperCase() 
       break;
       default:"U"
     }
       return this.initialAvatarText = first+second 
  }
  getAllMessage(id){
    
     this.router.navigate(['/home'],{queryParams:{
       userId:id
     }})
    
  }
}
