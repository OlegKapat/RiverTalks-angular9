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
  groupList:Group[]=[];
  selectedIndex: number = null;
  initialAvatarImage:string;
  initialAvatarText:string;
  constructor(private groupService:GroupService, private apiService:ApiService) { }
// Быстрей всего этот модуль не будет использоваться


  ngOnInit(): void {
    // this.groupService.getGroup();
    // this.apiService.on<Group[]>("group/get").subscribe(data=>{this.groupList=data['groups']})
  }
  getGroup(){
   
  }
  setIndex(index: number) {
    this.selectedIndex = index;
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
}
