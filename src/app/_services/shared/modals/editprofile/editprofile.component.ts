import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from '../settings/settings.component';
import { ApiService } from 'src/app/_services/api.service';
import { UserService } from 'src/app/_services/user.service';
import { ThemePalette } from '@angular/material/core';
import { LoadimageonserverComponent } from '../loadimageonserver/loadimageonserver.component';
import { EditusernameComponent } from '../editusername/editusername.component';
import { EditemailComponent } from '../editemail/editemail.component';
import { EditphoneComponent } from '../editphone/editphone.component';

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
  color: ThemePalette = "primary";
  checked = true;
  disabled = false;
  initialAvatarText: string;
  
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal,
              private apiService:ApiService, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.apiService.on('user/get').subscribe(data=>{this.user=data,console.log(this.user),console.log();
    
    
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
     this.modalService.open(LoadimageonserverComponent)
 }
 clearImage(){
   this.imageView=!this.imageView
 }
 changeName(){
   this.modalService.open(EditusernameComponent,{size:"sm"})
   this.activeModal.close()
 }
 transformAvatar(name: string): string {
  var str = name.split(" ");
  var first = "";
  var second = "";
  switch (str.length) {
    case 1:
      first = str[0][0]; // добавить позже toUpperCase()
      break;
    case 2:
      (first = str[0][0].toUpperCase()), (second = str[1][0].toUpperCase());
      break;
    default:
      "U";
  }
  return (this.initialAvatarText = first + second);
}
changeMail(){
  this.modalService.open(EditemailComponent,{size:"sm"})
}
changePhone(){
   this.modalService.open(EditphoneComponent,{size:"sm"})
}
}
