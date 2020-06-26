import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-editemail",
  templateUrl: "./editemail.component.html",
  styleUrls: ["./editemail.component.css"],
})
export class EditemailComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  editMail(mail) {
    this.userService.mailUpdate(mail);
    this.activeModal.close();
  }
}
