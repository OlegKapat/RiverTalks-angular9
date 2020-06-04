import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/_services/user.service';
import { ApiService } from 'src/app/_services/api.service';
import { GroupService } from 'src/app/_services/group.service';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupmembersComponent } from '../groupmembers/groupmembers.component';

@Component({
  selector: 'app-groupprofile',
  templateUrl: './groupprofile.component.html',
  styleUrls: ['./groupprofile.component.css']
})
export class GroupprofileComponent implements OnInit, AfterViewInit {
  group:any;
  disabled = false;
  checked=true;
  sign:string;
  color: ThemePalette = 'primary';
  groupId:number;
  initialAvatarText:string;
  initialAvatarImage:string;
  title:string;
  groupMembers:any;
  countMembers:number;
  selectedIndexForUser:number;
  listOfUsersGroup:any[]=[];
  selectedIndex: number = null;
  image:File=null;
  imagePrevie: string | ArrayBuffer;
  


  constructor(public activeModal:NgbActiveModal,private groupService:GroupService,
    private apiService:ApiService, private route:ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {
   
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:Params)=> this.groupId=+params['groupId']);
    this.groupService.getGroup(this.groupId);
    this.apiService.on('group/get').subscribe(data=>{this.group=data['groups']
                                             
                                              this.title=this.group[0]['title'],
                                              this.sign= this.transformAvatar(this.group[0]['title'])  
                                             // this.initialAvatarImage=this.group['avatar']['file'['url']]
    },error=>console.log(error));
    this.groupService.getMembers(this.groupId)
    this.apiService.on("group/members").subscribe(data=>{
                                                         this.countMembers=data['count'],
                                                         this.listOfUsersGroup=[...data['users']]
                                                         this.listOfUsersGroup.forEach(val=> {
                                                          val.signs=this.transformAvatar(val['name'])
                                                        })                                                                                                    
    })
  }
  close(){
    this.activeModal.dismiss()
  }
  transformAvatar(name:string):string{
    var str=name.split(' ');
    var first='';
    var second='';
     switch(str.length){
       case 1:first=str[0][0];// добавить позже toUpperCase()
       break;
       case 2:first=str[0][0].toUpperCase(),second=str[1][0].toUpperCase() 
       break;
       default:"U"
     }
       return this.initialAvatarText = first+second 
  }
  getUserInfo(event,id){
    event.preventDefault();
   // this.dialog.open(ModalforgroupComponent)
  
  }
  setIndexForGroup(index: number) {
    this.selectedIndexForUser = index;
  }
  getMembers(){
    this.modalService.open(GroupmembersComponent,{ size: 'sm' } )
    this.activeModal.dismiss();
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
  onFileUpload(event:any){              // загрузка зображення
    const file=event.target.files[0];
    this.image=file;

    const reader=new FileReader()
    reader.onload=()=>{
      this.imagePrevie=reader.result;
    }
    reader.readAsDataURL(file)
 }
}
