import { Component, OnInit } from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, ContactService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { AddcontactComponent } from '../addcontact/addcontact.component';

@Component({
  selector: 'app-contactmodal',
  templateUrl: './contactmodal.component.html',
  styleUrls: ['./contactmodal.component.css']
})
export class ContactmodalComponent implements OnInit {
  search="";
  initialAvatarText:string;
  initialAvatarImage:string;
  selectedIndex: number = null;
  contactform:any[]=[];
  allcontacts$:Observable<any[]>;

  constructor(public activeModal: NgbActiveModal, private apiService:ApiService,
              private contactService:ContactService, public modal:NgbModal ) { }

  ngOnInit(): void {
    this.contactService.getContacts();
    this.allcontacts$=this.apiService.on("contact/get");
    this.allcontacts$.subscribe(data=>{this.contactform=[...data['contacts']]
    if(this.contactform){
      this.contactform.forEach(value=>{   
        if(value['user']['avatar']['file']['url'] ==""){
         value.sign= this.transformAvatar(value['user']['name'])
        }
        else{
          value.url=value['user']['avatar']['file']['url'] 
        }
      })
    }
  })
    
  }
  createContact(){
     this.modal.open(AddcontactComponent,{ size: 'sm',centered: true });
     this.activeModal.close();
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
}
