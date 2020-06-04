import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService, ApiService } from 'src/app/_services';
import { GroupService } from 'src/app/_services/group.service';

@Component({
  selector: 'app-cleargroupchat',
  templateUrl: './cleargroupchat.component.html',
  styleUrls: ['./cleargroupchat.component.css']
})
export class CleargroupchatComponent implements OnInit,AfterViewInit {
   group:string;
   groupId:number;

  constructor(public activeModal:NgbActiveModal, private route :ActivatedRoute,
    private groupService:GroupService,private apiService:ApiService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:Params)=> this.groupId=+params['groupId']);
    this.groupService.getGroup(this.groupId);
    this.apiService.on('group/get').subscribe(data=>{this.group=data['groups'][0]['title']}
    );

  }
  deleteChat(){
     
  }
}
