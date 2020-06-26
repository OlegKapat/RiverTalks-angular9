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

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.userService.getUser();
    this.apiService.on("user/get").pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.user = data;
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
  changeName() {
    this.modalService.open(EditusernameComponent, { size: "sm" });
    this.activeModal.close();
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
  changeMail() {
    this.modalService.open(EditemailComponent, { size: "sm" });
  }
  changePhone() {
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
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
  change(name){
    this.userService.nameUpdate(name);
    this.getUser()
  }
}
