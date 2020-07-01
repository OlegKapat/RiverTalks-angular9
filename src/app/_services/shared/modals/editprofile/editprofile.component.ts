import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SettingsComponent } from "../settings/settings.component";
import { ApiService } from "src/app/_services/api.service";
import { UserService } from "src/app/_services/user.service";
import { ThemePalette } from "@angular/material/core";
import { EditusernameComponent } from "../editusername/editusername.component";
import { EditemailComponent } from "../editemail/editemail.component";
import { EditphoneComponent } from "../editphone/editphone.component";
import { GetimageforavatarComponent } from "../getimageforavatar/getimageforavatar.component";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.scss"],
})
export class EditprofileComponent implements OnInit,OnDestroy {
  user: any;
  image: File;
  imagePrevie: string | ArrayBuffer;
  imageView: boolean = false;
  color: ThemePalette = "primary";
  checked = true;
  disabled = false;
  initialAvatarText: string;
  destroy$ = new Subject<void>();
  sign: string;
  username:string;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getUser()
  }
 
  getUser(){
    this.userService.getUser();
    this.apiService.on("user/get").pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.user = data;
        this.username=data['user']['name']
        this.sign=this.transformAvatar(this.username)
      },
      (error) => console.log(error)
    );
  }
  back() {
    this.activeModal.close();
    this.modalService.open(SettingsComponent, { size: "sm", centered: true });
  }
  close() {
    this.activeModal.dismiss();
  }
  onFileUpload(event: any) {
    // загрузка зображення
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrevie = reader.result;
    };
    reader.readAsDataURL(file);
    this.imageView = true;
  }
  setImageAvatar() {
    this.modalService.open(GetimageforavatarComponent);
  }
  changeName(name) {
    sessionStorage.setItem("namelogin",name)
    this.modalService.open(EditusernameComponent, { size: "sm" });
  }
  changeMail(mail) {
    sessionStorage.setItem("namemail",mail)
    this.modalService.open(EditemailComponent, { size: "sm" });
  }
  changePhone(phone) {
    sessionStorage.setItem("namephone",phone)
    this.modalService.open(EditphoneComponent, { size: "sm" });
  }
  getWallet(wallet){
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (wallet));
      e.preventDefault();
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
  }
  getPartner(partner){
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (partner));
      e.preventDefault();
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
  let id=btoa(this.user['user']['partner_id']);
  this.router.navigate([`/home/${id}`])
  this.activeModal.close()
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
  change(name){
    this.userService.nameUpdate(name);
    this.getUser()
  }
  transformAvatar(name: string): string {
    var str = name.split(" ");
    var first = "";
    var second = "";
    switch (str.length) {
      case 1:
        first = str[0][0].toUpperCase(); // добавить позже toUpperCase()
        break;
      case 2:
        (first = str[0][0].toUpperCase()), (second = str[1][0].toUpperCase());
        break;
      default:
        "U";
    }
    return (this.initialAvatarText = first + second);
  }
  insertPrivate(event){
    this.userService.privateUpdate(event['checked'])
  }
}
