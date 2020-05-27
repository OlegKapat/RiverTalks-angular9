import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_services/api.service';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {
  search="";
  numberId:number;
  findUser:any[]=[];
   myControl:FormControl = new FormControl('');
  constructor(public activeModal: NgbActiveModal,private contactService:ContactService, 
    private apiService:ApiService, private userService:UserService ) { }

  ngOnInit(): void {
  
  }
  createContact(event){
   this.userService.searchUser(event)
    this.apiService.on('user/search').subscribe((data:any)=>{this.findUser=data['users']
       
    },error=>console.log(error)
    )
  }
  getId(id):number{
    return this.numberId=id;
    
  }
  addContact(){
    this.contactService.addContactToList(this.numberId);
    this.activeModal.dismiss();
  }
}
