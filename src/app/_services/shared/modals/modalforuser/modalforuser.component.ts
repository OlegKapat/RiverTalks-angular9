import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserprofileComponent } from "../userprofile/userprofile.component";
import { MatDialog } from "@angular/material/dialog";
import { DeletechatComponent } from "../deletechat/deletechat.component";
import { CleargroupchatComponent } from "../cleargroupchat/cleargroupchat.component";

@Component({
  selector: "app-modalforuser",
  templateUrl: "./modalforuser.component.html",
  styleUrls: ["./modalforuser.component.css"],
})
export class ModalforuserComponent implements OnInit {
  constructor(private modalService: NgbModal, public dialog: MatDialog) {}

  ngOnInit(): void {}
  showUserProfile() {
    this.modalService.open(UserprofileComponent, { size: "sm" });
    this.dialog.closeAll();
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
}
