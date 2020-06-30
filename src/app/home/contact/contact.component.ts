import { Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { ApiService } from 'src/app/_services';
import { ContactService } from 'src/app/_services/contact.service';
import { Observable, concat, pipe, merge, zip } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Group } from 'src/app/_models/group';
import { GroupService } from 'src/app/_services/group.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalforuserComponent } from 'src/app/_services/shared/modals/modalforuser/modalforuser.component';
import { ModalforgroupComponent } from 'src/app/_services/shared/modals/modalforgroup/modalforgroup.component';
import value from '*html';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,AfterViewInit {
  @Input()searchfield:string;
  allcontacts$:Observable<any[]>;
  allgroups$:Observable<any[]>;
  result$:Observable<any[]>;
  contactform:any[]=[]
  initialAvatarImage:string;
  initialAvatarText:string;
  newcontactform:any[]=[];
  selectedIndex: number = null;
  selectedIndexForGroup: number = null;
  groupList:Group[]=[];


  constructor(private apiService:ApiService, private contactService:ContactService,
              private router:Router, private groupService:GroupService,public dialog:MatDialog,private route:ActivatedRoute ) { }

  ngOnInit(): void {
     this.getList()
  }
   getList(){
    this.contactService.getContacts()
    this.allcontacts$=this.apiService.on("contact/get")
    this.groupService.getGroup();
    this.allgroups$=this.apiService.on<Group[]>("group/get")
    zip(this.allgroups$,this.allcontacts$).subscribe(data=>{this.contactform=[data[0]['groups'],data[1]['contacts']]
     if(this.contactform){
       this.contactform[1].forEach(value=>{   
         if(value['user']['avatar']['file']['url'] ==""){
          value.sign= this.transformAvatar(value['user']['name'])
         }
         else{
           value.url=value['user']['avatar']['file']['url'] 
         }
       })
     }
     if(this.contactform){
       this.contactform[0].forEach(value=>{  
         if(value['avatar']['file']['url'] ==""){
           value.sign= this.transformAvatar(value['title']) 
         }
         else{
           value.url=value['avatar']['file']['url']
         }
          
       })
     }
    })
   }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((param:Params)=>{
      if(param['groupCreate']=="ok"){
        this.getList()
      }
      else if(param['groupDelete']=="ok"){
        this.getList()
      }
      else if(param['newUser']=="add"){
        this.getList()
      }
    })
  }
setIndex(index: number) {
    this.selectedIndex = index;
 }
 setIndexForGroup(index: number) {
  this.selectedIndexForGroup = index;
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
  getGroupMessage(id){
    this.router.navigate(['/home'],{queryParams:{
      groupId:id
    }})
  }
  getUser(event,id){
    event.preventDefault();
     this.dialog.open(ModalforuserComponent)
     this.getAllMessage(id)
  }
  getGroup(event,id){
    event.preventDefault();
    this.dialog.open(ModalforgroupComponent)
    this.getGroupMessage(id)
  }
}