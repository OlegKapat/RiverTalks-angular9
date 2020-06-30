import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-editphone",
  templateUrl: "./editphone.component.html",
  styleUrls: ["./editphone.component.css"],
})
export class EditphoneComponent implements OnInit {
  currentPhone:string;
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}

  ngOnInit( ): void {this.currentPhone= sessionStorage.getItem("namephone")}

  editPhone(phone) {
    this.userService.phoneUpdate(phone);
    this.activeModal.close();
  }
}
