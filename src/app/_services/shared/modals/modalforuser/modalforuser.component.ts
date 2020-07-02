import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserprofileComponent } from "../userprofile/userprofile.component";
import { MatDialog } from "@angular/material/dialog";
import { DeletechatComponent } from "../deletechat/deletechat.component";
import { CleargroupchatComponent } from "../cleargroupchat/cleargroupchat.component";
import { ActivatedRoute, Params } from "@angular/router";
import { ContactService } from "src/app/_services/contact.service";

@Component({
  selector: "app-modalforuser",
  templateUrl: "./modalforuser.component.html",
  styleUrls: ["./modalforuser.component.css"],
})
export class ModalforuserComponent implements OnInit, AfterViewInit {
  userId: number;
  constructor(
    private modalService: NgbModal,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {}
  showUserProfile() {
    this.modalService.open(UserprofileComponent, { size: "sm" });
    this.dialog.closeAll();
  }
  ngAfterViewInit() {
    this.route.queryParams.subscribe(
      (params: Params) => (this.userId = +params["userId"])
    );
  }
  deleteChat() {
    this.modalService.open(DeletechatComponent, { size: "sm" });
    this.dialog.closeAll();
  }
  deleteHistory() {
    this.modalService.open(CleargroupchatComponent, { size: "sm" });
    this.dialog.closeAll();
  }
  deleteGroup() {}
  addInBlackList() {
    this.contactService.addInBlackList(this.userId)
  }
}
