import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from 'src/app/_services/contact.service';
import { ApiService } from 'src/app/_services/api.service';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-forwardmodal',
  templateUrl: './forwardmodal.component.html',
  styleUrls: ['./forwardmodal.component.css']
})
export class ForwardmodalComponent implements OnInit {
  allcontacts$:Observable<any[]>;
  contactform:any[]=[];
  initialAvatarText:string;
  initialAvatarImage:string;
  selectedIndex: number = null;
  search="";
  @Input() my_modal_title;
  //@Input() my_modal_content;

  constructor(public activeModal: NgbActiveModal, private contactService:ContactService, 
              private apiService:ApiService, private messageService:MessageService) { }
   
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
     switch(str.length){
       case 1:first=str[0][0].toUpperCase();
       break;
       case 2:first=str[0][0].toUpperCase(),second=str[1][0].toUpperCase() 
       break;
       default:"U"
     }
       return this.initialAvatarText = first+second 
  }
  forwardMessage(userId){
   let message=sessionStorage.getItem('copy');
   this.messageService.sendMessage(message,userId);
   console.log(userId);
   
 }
 setIndex(index: number) {
  this.selectedIndex = index;
}
}
