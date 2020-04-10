import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/_services/group.service';
import { ApiService } from 'src/app/_services';
import { Group } from 'src/app/_models/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private groupService:GroupService, private apiService:ApiService) { }

  ngOnInit(): void {
  }
  addGroup(){
    this.groupService.addGroup();
    this.apiService.on<Group>("group/new")
  }
}
