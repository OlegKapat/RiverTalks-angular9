import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { FileserviceService } from 'src/app/_services/fileservice.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Params, ActivatedRoute } from '@angular/router';
import { AvatarserviceService } from 'src/app/_services/avatarservice.service';

@Component({
  selector: 'app-groupavatar',
  templateUrl: './groupavatar.component.html',
  styleUrls: ['./groupavatar.component.css']
})
export class GroupavatarComponent implements OnInit, AfterViewInit {
  avatar:any;
  groupId:number;
  constructor(private apiServie:ApiService,private fileService:FileserviceService,
              public activeModal: NgbActiveModal,private route:ActivatedRoute, 
              private avatarService:AvatarserviceService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.fileService.getFile()
    this.apiServie.on("file/get").subscribe(data=>{this.avatar=data['files']
    })
    this.route.queryParams.subscribe((params:Params)=> this.groupId=+params['groupId']);
    
  }
  getImage(fileid){
    this.avatarService.setAvatarForGroup(this.groupId,fileid);
    this.activeModal.close();
  }

}
