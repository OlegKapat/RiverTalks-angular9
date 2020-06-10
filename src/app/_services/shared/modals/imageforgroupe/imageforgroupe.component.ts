import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { GroupService } from 'src/app/_services/group.service';
import { GroupavatarComponent } from '../groupavatar/groupavatar.component';

@Component({
  selector: 'app-imageforgroupe',
  templateUrl: './imageforgroupe.component.html',
  styleUrls: ['./imageforgroupe.component.css']
})
export class ImageforgroupeComponent implements OnInit,AfterViewInit {
  image:File=null;
  imagePrevie: string | ArrayBuffer;
  title:string;
  group:any;
  groupId:number;
  type:string;

  constructor(public activeModal: NgbActiveModal, private route:ActivatedRoute,
              private apiService:ApiService,private groupService:GroupService,
              private modalService: NgbModal ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:Params)=> this.groupId=+params['groupId']);
    this.groupService.getGroup(this.groupId);
    this.apiService.on('group/get').subscribe(data=>{this.title=data['groups'][0]['title']
    },error=>console.log(error));
  }
  onFileUpload(event:any){    
              // загрузка зображення         
    this.type=event.target.files[0].type.split('/').shift()
    const file=event.target.files[0];
    this.image=file;
    const reader=new FileReader()
    reader.onload=()=>{
      this.imagePrevie=reader.result;
    }
    reader.readAsDataURL(file)
    
 }
 uploadPhoto(){
    this.groupService.sendAvatar(this.image,this.type).subscribe(data=>console.log(data))
 }
 addPhoto(){
    this.modalService.open(GroupavatarComponent,{size:"md"})
    this.activeModal.close()
 }
}
