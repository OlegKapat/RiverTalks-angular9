import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_services/api.service';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit,OnDestroy {
  search="";
  numberId:number;
  findUser:any[]=[];
   myControl:FormControl = new FormControl('');
   destroy$ = new Subject<void>()
  constructor(public activeModal: NgbActiveModal,private contactService:ContactService, 
    private apiService:ApiService, private userService:UserService, private router:Router ) { }

  ngOnInit(): void {
  
  }
  createContact(event){
   this.userService.searchUser(event)
   this.apiService.on('user/search').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{this.findUser=data['users']
   
    },error=>console.log(error)
    )
  }
  getId(id):number{
    return this.numberId=id;
    
  }
  addContact(){
    this.contactService.addContactToList(this.numberId);
    this.router.navigate(["home"], {
      queryParams: {
        newUser:'add',
      },
      queryParamsHandling: "merge",
    });
    this.activeModal.dismiss();
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
