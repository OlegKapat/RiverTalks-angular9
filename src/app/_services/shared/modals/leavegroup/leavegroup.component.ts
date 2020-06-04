import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/_services/group.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-leavegroup',
  templateUrl: './leavegroup.component.html',
  styleUrls: ['./leavegroup.component.css']
})
export class LeavegroupComponent implements OnInit,AfterViewInit {
  groupId:number;
  constructor(public activeModal:NgbActiveModal,private groupService:GroupService,
              private route:ActivatedRoute, private apiService:ApiService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:Params)=> this.groupId=+params['groupId']);
  }
  leaveGroup(){
    this.groupService.leaveGroup(this.groupId);
    this.activeModal.close();
  }
}
