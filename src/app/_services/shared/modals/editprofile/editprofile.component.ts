import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from '../settings/settings.component';
import { ApiService } from 'src/app/_services/api.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  user:any;
  image:File;
  imagePrevie: string | ArrayBuffer;
  imageView:boolean=false;
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal,
              private apiService:ApiService, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.apiService.on('user/get').subscribe(data=>{this.user=data,console.log(this.user)
    
    },error=>console.log(error));
    
  }
 
   back(){
     this.activeModal.close();
     this.modalService.open(SettingsComponent,{ size: 'sm',centered: true } )
   }
   close(){
     this.activeModal.dismiss()
   }
   onFileUpload(event:any){          // загрузка зображення
    const file=event.target.files[0];
    this.image=file;
    const reader=new FileReader()
    reader.onload=()=>{
      this.imagePrevie=reader.result;
    }
    reader.readAsDataURL(file)   
    this.imageView=true;
 }
 setImageAvatar(){

 }
 clearImage(){
   this.imageView=!this.imageView
 }
}
