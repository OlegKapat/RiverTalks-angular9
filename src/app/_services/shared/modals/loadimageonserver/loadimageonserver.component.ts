import { Component, OnInit, OnDestroy } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { AvatarserviceService } from "src/app/_services/avatarservice.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { GroupavatarComponent } from "../groupavatar/groupavatar.component";
import { SendfileinchatComponent } from '../sendfileinchat/sendfileinchat.component';

@Component({
  selector: "app-loadimageonserver",
  templateUrl: "./loadimageonserver.component.html",
  styleUrls: ["./loadimageonserver.component.css"],
})
export class LoadimageonserverComponent implements OnInit, OnDestroy {
  image: File = null;
  imagePrevie: string | ArrayBuffer;
  type: string;
  destroyed$ = new Subject();

  constructor(
    private avatarService: AvatarserviceService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}
  onFileUpload(event: any) {
    // загрузка зображення
    this.type = event.target.files[0].type.split("/").shift();
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrevie = reader.result;
    };
    reader.readAsDataURL(file);
  }
  uploadFile() {
    this.avatarService
      .sendFile(this.image, this.type)
      // .pipe(takeUntil(this.destroyed$))
      // .subscribe((data) => console.log(data));
  }
  addFile() {
    this.modalService.open(SendfileinchatComponent, { size: "md" });
    this.activeModal.close();
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
