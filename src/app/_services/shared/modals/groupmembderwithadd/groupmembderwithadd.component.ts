import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/_services';
import { GroupService } from 'src/app/_services/group.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddmembertogroupComponent } from '../addmembertogroup/addmembertogroup.component';

@Component({
  selector: 'app-groupmembderwithadd',
  templateUrl: './groupmembderwithadd.component.html',
  styleUrls: ['./groupmembderwithadd.component.css']
})
export class GroupmembderwithaddComponent implements OnInit, AfterViewInit,OnDestroy  {
  @Input()search:string='';
  groupId:number;
  destroyed$ = new Subject();
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
      this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe((params:Params)=> this.groupId=+params['groupId']);
      this.groupService.getMembers(this.groupId);
      this.apiService.on("group/members").pipe(takeUntil(this.destroyed$)).subscribe((data:any)=>{this.listOfGroupUser=[...data['users']]
      this.listOfGroupUser.forEach(val=> {
          val.sign=this.transformAvatar(val['name'])
          })
        });
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
             
      setIndex(index: number) {
          this.selectedIndex = index;
          }
      ngOnDestroy(){
        this.destroyed$.next();
        this.destroyed$.complete();
      }
      addMembers(){
        this.modalService.open(AddmembertogroupComponent,{size:'md'})
      }
}
