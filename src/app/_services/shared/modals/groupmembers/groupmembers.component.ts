import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ApiService } from 'src/app/_services';
import { GroupService } from 'src/app/_services/group.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GroupprofileComponent } from '../groupprofile/groupprofile.component';

@Component({
  selector: 'app-groupmembers',
  templateUrl: './groupmembers.component.html',
  styleUrls: ['./groupmembers.component.css']
})
export class GroupmembersComponent implements OnInit, AfterViewInit {
  @Input()search:string='';
  groupId:number;
  listOfGroupUser:any[]=[];
  initialAvatarText:string;
  initialAvatarImage:string;
  selectedIndex: number = null;
  constructor(private apiService:ApiService,private groupService:GroupService,
              public activeModal: NgbActiveModal, private route:ActivatedRoute,
              private modalService: NgbModal) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    // this.route.queryParams.pipe(switchMap(val=>this.apiService.on("group/members"))).subscribe((params:Params)=>{this.groupId=params['groupId'],this.groupService.getMembers(this.groupId)
    // })
    this.route.queryParams.subscribe((params:Params)=> this.groupId=+params['groupId']);
    this.groupService.getMembers(this.groupId);
    this.apiService.on("group/members").subscribe((data:any)=>{this.listOfGroupUser=[...data['users']]
       this.listOfGroupUser.forEach(val=> {
         val.sign=this.transformAvatar(val['name'])
       })
       });
    }
   back(){
       this.activeModal.dismiss();
       this.modalService.open(GroupprofileComponent,{ size: 'sm' } )
   }
   close(){
      this.activeModal.dismiss()
   }
   transformAvatar(name:string):string{
    var str=name.split(' ');
    var first='';
    var second='';
     switch(str.length){
       case 1:first=str[0][0]; // добавить позже toUpperCase()
       break;
       case 2:first=str[0][0].toUpperCase(),second=str[1][0].toUpperCase();
       break;
       default:"U"
     }
       return this.initialAvatarText = first+second 
  }
  userInfo(event, id){

  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
}
