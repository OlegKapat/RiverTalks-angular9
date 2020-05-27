import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/_services';
import { GroupService } from 'src/app/_services/group.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-groupmembers',
  templateUrl: './groupmembers.component.html',
  styleUrls: ['./groupmembers.component.css']
})
export class GroupmembersComponent implements OnInit, AfterViewInit {
  groupId:number;
  listOfGroupUser:any[]=[]
  constructor(private apiService:ApiService,private groupService:GroupService,
              public activeModal: NgbActiveModal, private route:ActivatedRoute) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:Params)=> this.groupId=+params['groupId']);
  }
   back(){

   }
   close(){
      this.activeModal.dismiss()
   }
}
